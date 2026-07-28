package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.dto.auth.CreateRegistrarRequest;
import com.example.studentcourseregistration.dto.auth.UserResponse;
import com.example.studentcourseregistration.entity.User;
import com.example.studentcourseregistration.enums.Role;
import com.example.studentcourseregistration.exception.ResourceAlreadyExistsException;
import com.example.studentcourseregistration.mapper.UserMapper;
import com.example.studentcourseregistration.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Transactional
    public UserResponse createRegistrar(CreateRegistrarRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        User registrar = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.REGISTRAR)
                .build();
        userRepository.save(registrar);
        return userMapper.toResponse(registrar);
    }
}