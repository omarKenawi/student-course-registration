package com.example.studentcourseregistration.repository;

import com.example.studentcourseregistration.entity.Enrollment;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

}