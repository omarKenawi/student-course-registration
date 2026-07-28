package com.example.studentcourseregistration.repository;

import com.example.studentcourseregistration.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.id = :courseId AND e.status = 'ACTIVE'")
    Long countActiveByCourseId(@Param("courseId") Long courseId);

    @Query("""
                SELECT
                    e.course.id AS courseId,
                    COUNT(e) AS activeCount
                FROM Enrollment e
                WHERE e.status = 'ACTIVE'
                GROUP BY e.course.id
            """)
    List<CourseEnrollmentCount> countActiveEnrollmentsPerCourse();

    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);

    @Query("""
                SELECT e
                FROM Enrollment e
                JOIN FETCH e.student s
                JOIN FETCH s.user
                JOIN FETCH e.course
                WHERE e.id = :id
            """)
    Optional<Enrollment> findByIdWithStudentAndCourse(Long id);

    @Query("""
                SELECT e
                FROM Enrollment e
                JOIN FETCH e.course c
                JOIN FETCH e.student s
                JOIN FETCH s.user
                WHERE s.id = :studentId
                  AND e.status = 'ACTIVE'
            """)
    List<Enrollment> findActiveByStudentId(Long studentId);

    @Query("""
                SELECT e
                FROM Enrollment e
                JOIN FETCH e.student s
                JOIN FETCH s.user
                JOIN FETCH e.course
                WHERE e.course.id = :courseId
                  AND e.status = 'ACTIVE'
            """)
    List<Enrollment> findActiveByCourseId(Long courseId);

}