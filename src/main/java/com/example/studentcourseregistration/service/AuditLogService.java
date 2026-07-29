package com.example.studentcourseregistration.service;

import com.example.studentcourseregistration.dto.audit.AuditLogResponse;
import com.example.studentcourseregistration.entity.AuditLog;
import com.example.studentcourseregistration.entity.User;
import com.example.studentcourseregistration.enums.AuditAction;
import com.example.studentcourseregistration.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(readOnly = true)
    public Page<AuditLogResponse> getAll(Pageable pageable) {

        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "loggedAt")
        );

        return auditLogRepository.findAll(sortedPageable)
                .map(auditLog -> new AuditLogResponse(
                        auditLog.getId(),
                        auditLog.getUser().getId(),
                        auditLog.getAction(),
                        auditLog.getEntityType(),
                        auditLog.getEntityId(),
                        auditLog.getLoggedAt()
                ));
    }
}