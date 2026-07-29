package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.auth.LoginRequest;
import com.example.studentcourseregistration.dto.auth.LoginResponse;
import com.example.studentcourseregistration.dto.auth.UserResponse;
import com.example.studentcourseregistration.mapper.UserMapper;
import com.example.studentcourseregistration.security.AuthService;
import com.example.studentcourseregistration.security.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final SecurityUtils securityUtils;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse me() {
        return userMapper.toResponse(securityUtils.getCurrentUser());
    }
}