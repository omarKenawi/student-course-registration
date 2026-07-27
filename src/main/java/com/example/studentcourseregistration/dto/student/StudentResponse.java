package com.example.studentcourseregistration.dto.student;

import com.example.studentcourseregistration.enums.AcademicLevel;


public record StudentResponse(

        Long id,

        String fullName,

        String email,


        String studentNumber,

        AcademicLevel academicLevel

) {
}