package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.auth.CreateRegistrarRequest;
import com.example.studentcourseregistration.dto.auth.UserResponse;
import com.example.studentcourseregistration.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/registrars")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse createRegistrar(
            @Valid @RequestBody CreateRegistrarRequest request
    ) {
        return userService.createRegistrar(request);
    }
}