package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.dto.enrollment.RegisterRequest;
import com.example.studentcourseregistration.service.EnrolmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrolmentService enrolmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnrollmentResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return enrolmentService.register(request);
    }

    @PatchMapping("/{id}/drop")
    public EnrollmentResponse drop(@PathVariable Long id) {
        return enrolmentService.drop(id);
    }


}