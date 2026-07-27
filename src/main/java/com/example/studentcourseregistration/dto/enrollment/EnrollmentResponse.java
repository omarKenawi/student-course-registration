package com.example.studentcourseregistration.dto.enrollment;

import com.example.studentcourseregistration.enums.EnrollmentStatus;

import java.time.Instant;

public record EnrollmentResponse(

        Long id,

        Long studentId,

        String studentName,

        Long courseId,

        String courseCode,

        String courseTitle,

        EnrollmentStatus status,

        Instant enrolledAt,

        Instant droppedAt
) {
}
