import { Controller } from '@nestjs/common';
import { AuditTrailService } from './audit-trails.service';
// import { AuditTrailDto } from './audit-trail.dto';

@Controller('audit-trails')
export class AuditTrailController {
    constructor(private readonly auditTrailsService: AuditTrailService) {}

}