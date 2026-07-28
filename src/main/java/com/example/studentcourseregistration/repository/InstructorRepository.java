package com.example.studentcourseregistration.repository;

import com.example.studentcourseregistration.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    boolean existsByEmployeeNumber(String employeeNumber);

    @Query("""
                SELECT i
                FROM Instructor i
                JOIN FETCH i.user
                WHERE i.id = :id
            """)
    Optional<Instructor> findByIdWithUser(Long id);

    @Query("""
                SELECT i
                FROM Instructor i
                JOIN FETCH i.user
            """)
    List<Instructor> findAllWithUser();


}