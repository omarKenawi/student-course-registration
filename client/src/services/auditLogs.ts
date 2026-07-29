import api from './api'
import type { AuditLogResponse, PageResponse } from '../types/api'

export const getAuditLogs = (page = 0, size = 20) =>
  api.get<PageResponse<AuditLogResponse>>('/audit-logs', { params: { page, size } }).then((r) => r.data)