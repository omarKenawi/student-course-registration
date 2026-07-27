package com.example.studentcourseregistration.dto.audit;

import com.example.studentcourseregistration.enums.AuditAction;

import java.time.Instant;

public record AuditLogResponse(

        Long id,

        Long userId,

        AuditAction action,

        String entityType,

        Long entityId,

        Instant loggedAt
) {
}