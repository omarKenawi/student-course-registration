package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.security.SecurityUtils;
import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.dto.student.CreateStudentRequest;
import com.example.studentcourseregistration.dto.student.StudentResponse;
import com.example.studentcourseregistration.dto.student.UpdateStudentRequest;
import com.example.studentcourseregistration.service.EnrollmentService;
import com.example.studentcourseregistration.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final EnrollmentService enrollmentService;
    private final SecurityUtils securityUtils;


    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    public StudentResponse getCurrentStudent() {
        return studentService.getByUserId(securityUtils.getCurrentUser().getId());
    }

    @GetMapping("/me/schedule")
    @PreAuthorize("hasRole('STUDENT')")
    public List<EnrollmentResponse> getCurrentSchedule() {
        StudentResponse student = studentService.getByUserId(securityUtils.getCurrentUser().getId());
        return enrollmentService.getCurrentSchedule(student.id());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public StudentResponse create(
            @Valid @RequestBody CreateStudentRequest request) {

        return studentService.create(request);
    }

    @GetMapping("/{id}")
    @PreAuthorize("""
    hasAnyRole('ADMIN','REGISTRAR','INSTRUCTOR')
    or @authorizationService.canAccessStudent(#id)
""")
    public StudentResponse getById(@PathVariable Long id) {
        return studentService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','REGISTRAR','INSTRUCTOR')")
    public List<StudentResponse> getAll() {
        return studentService.getAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public StudentResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStudentRequest request) {

        return studentService.update(id, request);
    }

    @GetMapping("/{studentId}/schedule")
    @PreAuthorize("""
            hasRole('ADMIN')
            or hasRole('REGISTRAR')
            or @authorizationService.canAccessStudent(#studentId)
            """)
    public List<EnrollmentResponse> getCurrentSchedule(
            @PathVariable Long studentId) {

        return enrollmentService.getCurrentSchedule(studentId);
    }
}