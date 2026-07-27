package com.example.studentcourseregistration.dto.auth;

import jakarta.validation.constraints.NotNull;

public record RegisterRequest(

        @NotNull
        Long studentId,

        @NotNull
        Long courseId
) {
}