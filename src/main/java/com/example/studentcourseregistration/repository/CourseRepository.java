package com.example.studentcourseregistration.repository;

import com.example.studentcourseregistration.entity.Course;
import com.example.studentcourseregistration.enums.AcademicLevel;
import com.example.studentcourseregistration.enums.Term;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query(""" 
            SELECT c FROM Course c JOIN FETCH c.instructor i JOIN FETCH i.user WHERE c.id = :id""")
    Optional<Course> findByIdWithInstructorAndUser(@Param("id") Long id);

    boolean existsByCodeAndTermAndAcademicYear(String code, Term term, Integer academicYear);

    boolean existsByCodeAndTermAndAcademicYearAndIdNot(String code, Term term, Integer academicYear, Long id);


    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
                SELECT c
                FROM Course c
                WHERE c.id = :id
            """)
    Optional<Course> findByIdForUpdate(Long id);

    @Query("""
            select c
            from Course c
            join fetch c.instructor i
            join fetch i.user
            """)
    List<Course> findAllWithInstructorAndUser();
}