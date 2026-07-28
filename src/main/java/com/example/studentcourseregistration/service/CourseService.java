package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.dto.course.CourseResponse;
import com.example.studentcourseregistration.dto.course.CreateCourseRequest;
import com.example.studentcourseregistration.dto.course.UpdateCourseRequest;
import com.example.studentcourseregistration.entity.Course;
import com.example.studentcourseregistration.entity.Instructor;
import com.example.studentcourseregistration.exception.ResourceAlreadyExistsException;
import com.example.studentcourseregistration.exception.ResourceNotFoundException;
import com.example.studentcourseregistration.mapper.CourseMapper;
import com.example.studentcourseregistration.repository.CourseEnrollmentCount;
import com.example.studentcourseregistration.repository.CourseRepository;
import com.example.studentcourseregistration.repository.EnrollmentRepository;
import com.example.studentcourseregistration.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final InstructorRepository instructorRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseMapper courseMapper;

    @Transactional
    public CourseResponse create(CreateCourseRequest request) {
        Instructor instructor = instructorRepository.findById(request.instructorId())
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));
        if (courseRepository.existsByCodeAndTermAndAcademicYear(
                request.code(),
                request.term(),
                request.academicYear())) {

            throw new ResourceAlreadyExistsException("Course already exists for this term and academic year");
        }
        Course course = Course.builder()
                .code(request.code())
                .title(request.title())
                .description(request.description())
                .creditHours(request.creditHours())
                .capacity(request.capacity())
                .term(request.term())
                .academicYear(request.academicYear())
                .academicLevel(request.academicLevel())
                .instructor(instructor)
                .build();

        Course saved = courseRepository.save(course);
        return courseMapper.toResponse(saved, 0L);
    }

    @Transactional
    public CourseResponse update(Long id, UpdateCourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (request.code() != null) course.setCode(request.code());
        if (request.title() != null) course.setTitle(request.title());
        if (request.description() != null) course.setDescription(request.description());
        if (request.creditHours() != null) course.setCreditHours(request.creditHours());
        if (request.capacity() != null) course.setCapacity(request.capacity());
        if (request.term() != null) course.setTerm(request.term());
        if (request.academicLevel() != null) course.setAcademicLevel(request.academicLevel());
        if (request.academicYear() != null) course.setAcademicYear(request.academicYear());
        if (request.instructorId() != null) {
            Instructor instructor = instructorRepository.findById(request.instructorId()).orElseThrow(() -> new ResourceNotFoundException("instructor not found"));
            course.setInstructor(instructor);
        }
        if (courseRepository.existsByCodeAndTermAndAcademicYearAndIdNot(course.getCode(),course.getTerm(), course.getAcademicYear(), id)) {
            throw new ResourceAlreadyExistsException("Course already exists for this term and academic year");
        }
        Course saved = courseRepository.save(course);
        Long activeCount = enrollmentRepository.countActiveByCourseId(id);
        return courseMapper.toResponse(saved, activeCount);
    }

    @Transactional(readOnly = true)
    public CourseResponse getById(Long id) {
        Course course = courseRepository.findByIdWithInstructorAndUser(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        Long activeCount = enrollmentRepository.countActiveByCourseId(id);
        return courseMapper.toResponse(course, activeCount);
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getAll() {
        Map<Long,Long> activeCounts = enrollmentRepository
                .countActiveEnrollmentsPerCourse()
                .stream()
                .collect(Collectors.toMap(
                        CourseEnrollmentCount::getCourseId,
                        CourseEnrollmentCount::getActiveCount
                ));

        return courseRepository.findAllWithInstructorAndUser()
                .stream()
                .map(course -> courseMapper.toResponse(
                        course,
                        activeCounts.getOrDefault(course.getId(), 0L)
                ))
                .toList();
}
}