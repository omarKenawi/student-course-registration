package com.example.studentcourseregistration.mapper;

import com.example.studentcourseregistration.dto.instructor.InstructorResponse;
import com.example.studentcourseregistration.entity.Instructor;
import org.springframework.stereotype.Component;

@Component
public class InstructorMapper {

    public InstructorResponse toResponse(Instructor instructor) {
        if (instructor == null) return null;

        return new InstructorResponse(
                instructor.getId(),
                instructor.getUser().getFullName(),
                instructor.getUser().getEmail(),
                instructor.getEmployeeNumber()
        );
    }
}
