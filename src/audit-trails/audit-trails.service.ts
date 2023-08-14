import { Injectable } from '@nestjs/common';
import { AuditTrailRepository } from './audit-trail.repository';
// import { AuditTrailDto } from './audit-trail.dto';

@Injectable()
export class AuditTrailService {
    constructor(private auditTrailRepository: AuditTrailRepository) {}
}