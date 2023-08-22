import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditTrail } from './models/audit.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuditTrailRepository } from './audit-trail.repository';
import { AuditTrailController } from './audit-trails.controller';
import { AuditTrailService } from './audit-trails.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuditTrail, AuditTrailRepository]), EventEmitterModule.forRoot()],
    controllers: [AuditTrailController],
    providers: [AuditTrailService],
    exports: [AuditTrailService]
})
export class AuditTrailModule {}