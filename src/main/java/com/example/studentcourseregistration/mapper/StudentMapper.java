package com.example.studentcourseregistration.mapper;

import com.example.studentcourseregistration.dto.student.StudentResponse;
import com.example.studentcourseregistration.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public StudentResponse toResponse(Student student) {
        if (student == null) return null;

        return new StudentResponse(
                student.getId(),
                student.getUser().getFullName(),
                student.getUser().getEmail(),
                student.getStudentNumber(),
                student.getAcademicLevel()
        );
    }
}