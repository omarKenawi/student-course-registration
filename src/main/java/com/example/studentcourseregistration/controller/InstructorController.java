package com.example.studentcourseregistration.controller;

import com.example.studentcourseregistration.dto.instructor.CreateInstructorRequest;
import com.example.studentcourseregistration.dto.instructor.InstructorResponse;
import com.example.studentcourseregistration.dto.instructor.UpdateInstructorRequest;
import com.example.studentcourseregistration.service.InstructorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {

    private final InstructorService instructorService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public InstructorResponse create(
            @Valid @RequestBody CreateInstructorRequest request) {

        return instructorService.create(request);
    }

    @GetMapping("/{id}")
    public InstructorResponse getById(@PathVariable Long id) {
        return instructorService.getById(id);
    }

    @GetMapping
    public List<InstructorResponse> getAll() {
        return instructorService.getAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public InstructorResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateInstructorRequest request) {

        return instructorService.update(id, request);
    }
}