package com.example.studentcourseregistration.dto.course;

import com.example.studentcourseregistration.enums.Term;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record CreateCourseRequest(

        @NotBlank
        @Size(max = 20)
        String code,

        @NotBlank
        @Size(max = 100)
        String title,

        @Size(max = 1000)
        String description,

        @NotNull
        @Positive
        Integer creditHours,

        @NotNull
        @Positive
        Long capacity,

        @NotNull
        Term term,

        @NotNull
        @Positive
        Integer academicYear,

        @NotNull
        Long instructorId
) {
}