import { Repository } from 'typeorm';
import { AuditTrail } from 'src/models/audit.entity';

export class AuditTrailRepository extends Repository<AuditTrail> {}