package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.dto.instructor.CreateInstructorRequest;
import com.example.studentcourseregistration.dto.instructor.InstructorResponse;
import com.example.studentcourseregistration.dto.instructor.UpdateInstructorRequest;
import com.example.studentcourseregistration.entity.Instructor;
import com.example.studentcourseregistration.entity.User;
import com.example.studentcourseregistration.enums.Role;
import com.example.studentcourseregistration.exception.ResourceAlreadyExistsException;
import com.example.studentcourseregistration.exception.ResourceNotFoundException;
import com.example.studentcourseregistration.mapper.InstructorMapper;
import com.example.studentcourseregistration.repository.InstructorRepository;
import com.example.studentcourseregistration.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorService {

    private final InstructorRepository instructorRepository;
    private final UserRepository userRepository;
    private final InstructorMapper instructorMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public InstructorResponse create(CreateInstructorRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException("Email already exist");
        }

        if (instructorRepository.existsByEmployeeNumber(request.employeeNumber())) {
            throw new ResourceAlreadyExistsException("Employee number already exist");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.INSTRUCTOR)
                .build();

        User savedUser = userRepository.save(user);

        Instructor instructor = Instructor.builder()
                .user(savedUser)
                .employeeNumber(request.employeeNumber())
                .build();

        Instructor savedInstructor = instructorRepository.save(instructor);
        return instructorMapper.toResponse(savedInstructor);
    }

    @Transactional(readOnly = true)
    public InstructorResponse getById(Long id) {
        Instructor instructor = instructorRepository.findByIdWithUser(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: "+id));
        return instructorMapper.toResponse(instructor);
    }

    @Transactional(readOnly = true)
    public List<InstructorResponse> getAll() {
        return instructorRepository.findAllWithUser()
                .stream()
                .map(instructorMapper::toResponse)
                .toList();
    }

    @Transactional
    public InstructorResponse update(Long id, UpdateInstructorRequest request) {
        Instructor instructor = instructorRepository.findByIdWithUser(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: "+id));

        User user = instructor.getUser();

        if (request.fullName() != null) {
            user.setFullName(request.fullName());
        }

        if (request.email() != null) {
            if (!user.getEmail().equals(request.email())
                    && userRepository.existsByEmail(request.email())) {
                throw new ResourceAlreadyExistsException("Email already exist");
            }
            user.setEmail(request.email());
        }

        userRepository.save(user);
        return instructorMapper.toResponse(instructor);
    }

}