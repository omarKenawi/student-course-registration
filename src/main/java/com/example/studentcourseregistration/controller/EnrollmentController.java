package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.enrollment.EnrollmentResponse;
import com.example.studentcourseregistration.dto.enrollment.RegisterRequest;
import com.example.studentcourseregistration.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("""
                hasAnyRole('ADMIN','REGISTRAR')
                or @authorizationService.canAccessStudent(#request.studentId())
            """)
    public EnrollmentResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return enrollmentService.register(request);
    }

    @PatchMapping("/{id}/drop")
    @PreAuthorize("""
                hasAnyRole('ADMIN','REGISTRAR')
                or @authorizationService.canAccessEnrollment(#id)
            """)
    public EnrollmentResponse drop(@PathVariable Long id) {
        return enrollmentService.drop(id);
    }


}