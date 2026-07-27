package com.example.studentcourseregistration.dto.instructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateInstructorRequest(

        @Size(max = 100)
        String fullName,

        @NotBlank
        @Email
        @Size(max = 100)
        String email

) {
}