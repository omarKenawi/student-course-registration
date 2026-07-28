package com.example.studentcourseregistration.repository;

import com.example.studentcourseregistration.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByStudentNumber(String studentNumber);

    @Query("""
                SELECT s
                FROM Student s
                JOIN FETCH s.user
            """)
    List<Student> findAllWithUser();

    @Query("""
                SELECT s
                FROM Student s
                JOIN FETCH s.user
                WHERE s.id = :id
            """)
    Optional<Student> findByIdWithUser(Long id);

    Optional<Student> findByUserId(Long userId);
}