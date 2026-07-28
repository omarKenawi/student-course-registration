package com.example.studentcourseregistration.dto.auth;

import com.example.studentcourseregistration.enums.Role;

public record UserResponse(

        Long id,

        String fullName,

        String email,

        Role role
) {}