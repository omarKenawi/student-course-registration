package com.example.studentcourseregistration.dto.course;

import com.example.studentcourseregistration.enums.Term;

public record CourseResponse(

        Long id,

        String code,

        String title,

        String description,

        Integer creditHours,

        Integer capacity,

        Integer remainingSeats,

        Term term,

        Integer academicYear,

        Long instructorId,

        String instructorName
) {
}
