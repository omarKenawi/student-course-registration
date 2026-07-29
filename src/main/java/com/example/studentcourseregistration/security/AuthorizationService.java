package com.example.studentcourseregistration.security;

import com.example.studentcourseregistration.entity.*;
import com.example.studentcourseregistration.enums.Role;
import com.example.studentcourseregistration.repository.CourseRepository;
import com.example.studentcourseregistration.repository.EnrollmentRepository;
import com.example.studentcourseregistration.repository.InstructorRepository;
import com.example.studentcourseregistration.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthorizationService {

    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final SecurityUtils securityUtils;


    public boolean canAccessStudent(Long studentId) {

        User user = securityUtils.getCurrentUser();

        if (user.getRole() == Role.ADMIN
                || user.getRole() == Role.REGISTRAR) {
            return true;
        }

        Student student = studentRepository.findByUserId(user.getId())
                .orElse(null);

        return student != null
                && student.getId().equals(studentId);
    }

    public boolean canAccessCourseRoster(Long courseId) {

        User user = securityUtils.getCurrentUser();
        if (user.getRole() == Role.ADMIN
                || user.getRole() == Role.REGISTRAR) {
            return true;
        }
        Course course = courseRepository.findById(courseId)
                .orElse(null);
        if (course == null) {
            return false;
        }
        Instructor instructor = instructorRepository.findByUserId(user.getId())
                .orElse(null);

        return instructor != null
                && course.getInstructor().getId().equals(instructor.getId());
    }

    public boolean canAccessEnrollment(
            Long enrollmentId) {

        User user = securityUtils.getCurrentUser();
        if (user.getRole() == Role.ADMIN
                || user.getRole() == Role.REGISTRAR) {
            return true;
        }

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElse(null);

        if (enrollment == null) {
            return false;
        }

        Student student = studentRepository.findByUserId(user.getId())
                .orElse(null);

        return student != null
                && enrollment.getStudent().getId().equals(student.getId());
    }
}

