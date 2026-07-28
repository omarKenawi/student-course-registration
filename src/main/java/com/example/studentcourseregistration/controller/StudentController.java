package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.dto.student.CreateStudentRequest;
import com.example.studentcourseregistration.dto.student.StudentResponse;
import com.example.studentcourseregistration.dto.student.UpdateStudentRequest;
import com.example.studentcourseregistration.service.EnrolmentService;
import com.example.studentcourseregistration.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final EnrolmentService enrollmentService;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentResponse create(
            @Valid @RequestBody CreateStudentRequest request) {

        return studentService.create(request);
    }

    @GetMapping("/{id}")
    public StudentResponse getById(@PathVariable Long id) {
        return studentService.getById(id);
    }

    @GetMapping
    public List<StudentResponse> getAll() {
        return studentService.getAll();
    }

    @PutMapping("/{id}")
    public StudentResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStudentRequest request) {

        return studentService.update(id, request);
    }
    @GetMapping("/{studentId}/schedule")
    public List<EnrollmentResponse> getCurrentSchedule(
            @PathVariable Long studentId) {

        return enrollmentService.getCurrentSchedule(studentId);
    }
}