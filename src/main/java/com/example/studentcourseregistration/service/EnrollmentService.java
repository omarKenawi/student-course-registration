package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.dto.enrollment.RegisterRequest;
import com.example.studentcourseregistration.entity.Course;
import com.example.studentcourseregistration.entity.Enrollment;
import com.example.studentcourseregistration.entity.Student;
import com.example.studentcourseregistration.enums.AuditAction;
import com.example.studentcourseregistration.enums.EnrollmentStatus;
import com.example.studentcourseregistration.exception.BusinessRuleViolationException;
import com.example.studentcourseregistration.exception.ResourceNotFoundException;
import com.example.studentcourseregistration.mapper.EnrollmentMapper;
import com.example.studentcourseregistration.repository.CourseRepository;
import com.example.studentcourseregistration.repository.EnrollmentRepository;
import com.example.studentcourseregistration.repository.StudentRepository;
import com.example.studentcourseregistration.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final AuditLogService auditLogService;
    private final SecurityUtils securityUtils;

    @Transactional
    public EnrollmentResponse register(RegisterRequest request) {
        //make sure student exists
        Student student = studentRepository.findById(request.studentId()).orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        // make sure course exists and lock it
        Course course = courseRepository.findByIdForUpdate(request.courseId()).orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (student.getAcademicLevel() != course.getAcademicLevel()) {
            throw new BusinessRuleViolationException(
                    "Student cannot register for a course outside their academic level."
            );
        }

        //make sure enrollment does not exist in active state
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByStudentIdAndCourseId(student.getId(), course.getId());
        if (existingEnrollment.isPresent() && existingEnrollment.get().getStatus() == EnrollmentStatus.ACTIVE) {

            throw new BusinessRuleViolationException("Student is already enrolled in this course");
        }

        //make sure about availability
        Long activeEnrollments = enrollmentRepository.countActiveByCourseId(course.getId());
        if (activeEnrollments >= course.getCapacity()) {
            throw new BusinessRuleViolationException("Course is full.");
        }

        if (existingEnrollment.isPresent()) {

            Enrollment enrollment = existingEnrollment.get();

            enrollment.setStatus(EnrollmentStatus.ACTIVE);
            enrollment.setDroppedAt(null);
            enrollment.setEnrolledAt(Instant.now());
            auditLogService.log(
                    securityUtils.getCurrentUser(),
                    AuditAction.REGISTER,
                    "Enrollment",
                    enrollment.getId()
            );
            return enrollmentMapper.toResponse(enrollment);
        }
        Enrollment enrollment = Enrollment.builder().student(student).course(course).status(EnrollmentStatus.ACTIVE).enrolledAt(Instant.now()).build();

        Enrollment saved = enrollmentRepository.save(enrollment);
        auditLogService.log(
                securityUtils.getCurrentUser(),
                AuditAction.REGISTER,
                "Enrollment",
                enrollment.getId()
        );

        return enrollmentMapper.toResponse(saved);

    }

    @Transactional
    public EnrollmentResponse drop(Long enrollmentId) {

        Enrollment enrollment = enrollmentRepository
                .findByIdWithStudentAndCourse(enrollmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Enrollment not found"));

        if (enrollment.getStatus() == EnrollmentStatus.DROPPED) {
            throw new BusinessRuleViolationException(
                    "Enrollment is already dropped."
            );
        }

        enrollment.setStatus(EnrollmentStatus.DROPPED);
        enrollment.setDroppedAt(Instant.now());
        auditLogService.log(
                securityUtils.getCurrentUser(),
                AuditAction.DROP,
                "Enrollment",
                enrollment.getId()
        );
        return enrollmentMapper.toResponse(enrollment);
    }


    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getCourseRoster(Long courseId) {

        return enrollmentRepository.findActiveByCourseId(courseId)
                .stream()
                .map(enrollmentMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getCurrentSchedule(Long studentId) {

        studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        return enrollmentRepository.findActiveByStudentId(studentId)
                .stream()
                .map(enrollmentMapper::toResponse)
                .toList();
    }
}
