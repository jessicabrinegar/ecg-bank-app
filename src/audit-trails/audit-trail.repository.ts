import { Repository } from 'typeorm';
import { AuditTrail } from 'src/audit-trails/models/audit.entity';

export class AuditTrailRepository extends Repository<AuditTrail> {}