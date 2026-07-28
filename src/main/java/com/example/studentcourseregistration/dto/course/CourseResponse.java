package com.example.studentcourseregistration.dto.course;

import com.example.studentcourseregistration.enums.AcademicLevel;
import com.example.studentcourseregistration.enums.Term;

public record CourseResponse(

        Long id,

        String code,

        String title,

        String description,

        Integer creditHours,

        Long capacity,

        Long remainingSeats,

        Term term,

        Integer academicYear,

        AcademicLevel academicLevel,

        Long instructorId,

        String instructorName
) {
}
