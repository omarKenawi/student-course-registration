package com.example.studentcourseregistration.mapper;

import com.example.studentcourseregistration.dto.course.CourseResponse;
import com.example.studentcourseregistration.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {


    public CourseResponse toResponse(Course course, Long activeEnrollments) {
        if (course == null) {
            return null;
        }

        Long remainingSeats = Math.max(0L, course.getCapacity() - activeEnrollments);


        return new CourseResponse(
                course.getId(),
                course.getCode(),
                course.getTitle(),
                course.getDescription(),
                course.getCreditHours(),
                course.getCapacity(),
                remainingSeats,
                course.getTerm(),
                course.getAcademicYear(),
                course.getInstructor().getId(),
                course.getInstructor().getUser().getFullName()
        );
    }
}