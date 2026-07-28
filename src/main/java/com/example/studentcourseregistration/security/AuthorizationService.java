package com.example.studentcourseregistration.security;

import com.example.studentcourseregistration.entity.Instructor;
import com.example.studentcourseregistration.entity.Student;
import com.example.studentcourseregistration.entity.User;
import com.example.studentcourseregistration.enums.Role;
import com.example.studentcourseregistration.repository.InstructorRepository;
import com.example.studentcourseregistration.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthorizationService {

    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;


    public boolean canAccessStudent(
            Long studentId,
            Authentication authentication) {

        CustomUserDetails principal =
                (CustomUserDetails) authentication.getPrincipal();

        User user = principal.getUser();

        if (user.getRole() == Role.ADMIN
                || user.getRole() == Role.REGISTRAR) {
            return true;
        }

        Student student = studentRepository.findByUserId(user.getId())
                .orElse(null);

        return student != null
                && student.getId().equals(studentId);
    }

    public boolean canAccessCourse(
            Long instructorId,
            Authentication authentication) {

        CustomUserDetails principal =
                (CustomUserDetails) authentication.getPrincipal();

        User user = principal.getUser();

        if (user.getRole() == Role.ADMIN
                || user.getRole() == Role.REGISTRAR) {
            return true;
        }

        Instructor instructor = instructorRepository.findByUserId(user.getId())
                .orElse(null);

        return instructor != null
                && instructor.getId().equals(instructorId);
    }

}