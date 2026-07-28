package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.course.CourseResponse;
import com.example.studentcourseregistration.dto.course.CreateCourseRequest;
import com.example.studentcourseregistration.dto.course.UpdateCourseRequest;
import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.service.CourseService;
import com.example.studentcourseregistration.service.EnrolmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final EnrolmentService enrolmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN','REGISTRAR')")
    public CourseResponse create(@Valid @RequestBody CreateCourseRequest request) {
        return courseService.create(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','REGISTRAR')")
    public CourseResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCourseRequest request) {

        return courseService.update(id, request);
    }

    @GetMapping("/{id}")
    public CourseResponse getById(@PathVariable Long id) {
        return courseService.getById(id);
    }

    @GetMapping
    public List<CourseResponse> getAll() {
        return courseService.getAll();
    }
    @GetMapping("/{courseId}/roster")

    @PreAuthorize("hasAnyRole('ADMIN','REGISTRAR','INSTRUCTOR')")
    public List<EnrollmentResponse> getCourseRoster(
            @PathVariable Long courseId) {

        return enrolmentService.getCourseRoster(courseId);
    }
}