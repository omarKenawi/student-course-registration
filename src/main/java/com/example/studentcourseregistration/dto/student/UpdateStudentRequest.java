package com.example.studentcourseregistration.dto.student;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateStudentRequest(

        @Size(max = 100)
        String fullName,

        @Email
        @Size(max = 100)
        String email

) {
}