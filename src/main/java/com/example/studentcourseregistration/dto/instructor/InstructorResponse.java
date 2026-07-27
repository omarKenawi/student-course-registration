package com.example.studentcourseregistration.dto.instructor;

public record InstructorResponse(

        Long id,

        String fullName,

        String email,

        String employeeNumber
) {
}