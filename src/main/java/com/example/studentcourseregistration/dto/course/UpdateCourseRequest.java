package com.example.studentcourseregistration.dto.course;

import com.example.studentcourseregistration.enums.Term;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record UpdateCourseRequest(

        @Size(max = 20)
        String code,

        @Size(max = 100)
        String title,

        @Size(max = 1000)
        String description,

        @Positive
        Integer creditHours,

        @Positive
        Integer capacity,

        Term term,

        @Positive
        Integer academicYear,

        Long instructorId
) {
}