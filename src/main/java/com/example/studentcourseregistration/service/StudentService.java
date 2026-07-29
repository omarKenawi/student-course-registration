package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.dto.student.CreateStudentRequest;
import com.example.studentcourseregistration.dto.student.StudentResponse;
import com.example.studentcourseregistration.dto.student.UpdateStudentRequest;
import com.example.studentcourseregistration.entity.Student;
import com.example.studentcourseregistration.entity.User;
import com.example.studentcourseregistration.enums.AuditAction;
import com.example.studentcourseregistration.enums.Role;
import com.example.studentcourseregistration.exception.BusinessRuleViolationException;
import com.example.studentcourseregistration.exception.ResourceAlreadyExistsException;
import com.example.studentcourseregistration.exception.ResourceNotFoundException;
import com.example.studentcourseregistration.mapper.StudentMapper;
import com.example.studentcourseregistration.repository.StudentRepository;
import com.example.studentcourseregistration.repository.UserRepository;
import com.example.studentcourseregistration.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StudentMapper studentMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;
    private final SecurityUtils securityUtils;

    @Transactional
    public StudentResponse create(CreateStudentRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        if (studentRepository.existsByStudentNumber(request.studentNumber())) {
            throw new ResourceAlreadyExistsException("Student number already exist");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.STUDENT)
                .build();

        User savedUser = userRepository.save(user);

        Student student = Student.builder()
                .user(savedUser)
                .studentNumber(request.studentNumber())
                .academicLevel(request.academicLevel())
                .build();

        Student savedStudent = studentRepository.save(student);
        auditLogService.log(
                securityUtils.getCurrentUser(),
                AuditAction.CREATE,
                "Student",
                savedStudent.getId()
        );
        return studentMapper.toResponse(savedStudent);
    }

    @Transactional(readOnly = true)
    public StudentResponse getById(Long id) {
        Student student = studentRepository.findByIdWithUser(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: "+id));
        return studentMapper.toResponse(student);
    }

    @Transactional(readOnly = true)
    public List<StudentResponse> getAll() {
        return studentRepository.findAllWithUser()
                .stream()
                .map(studentMapper::toResponse)
                .toList();
    }

    @Transactional
    public StudentResponse update(Long id, UpdateStudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() ->  new ResourceNotFoundException("Student not found with id: "+id));

        User user = student.getUser();

        if (request.fullName() != null) {
            if(request.fullName().isBlank()){
                throw new BusinessRuleViolationException("name can not be empty");
            }
            user.setFullName(request.fullName());
        }

        if (request.email() != null) {
            if (!user.getEmail().equals(request.email())
                    && userRepository.existsByEmail(request.email())) {
                throw new  ResourceAlreadyExistsException("Email already exists");
            }
            user.setEmail(request.email());
        }

        userRepository.save(user);
        auditLogService.log(
                securityUtils.getCurrentUser(),
                AuditAction.UPDATE,
                "Student",
                student.getId()
        );
        return studentMapper.toResponse(student);
    }

}