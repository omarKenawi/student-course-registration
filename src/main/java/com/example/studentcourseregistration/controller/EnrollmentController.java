package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.dto.enrollment.RegisterRequest;
import com.example.studentcourseregistration.service.EnrolmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrolmentService enrolmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','REGISTRAR')")
    public EnrollmentResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return enrolmentService.register(request);
    }

    @PatchMapping("/{id}/drop")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','REGISTRAR')")
    public EnrollmentResponse drop(@PathVariable Long id) {
        return enrolmentService.drop(id);
    }


}