package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.entity.AuditLog;
import com.example.studentcourseregistration.entity.User;
import com.example.studentcourseregistration.enums.AuditAction;
import com.example.studentcourseregistration.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public void log(
            User user,
            AuditAction action,
            String entityType,
            Long entityId
    ) {

        AuditLog auditLog = AuditLog.builder()
                .user(user)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .build();

        auditLogRepository.save(auditLog);
    }
}