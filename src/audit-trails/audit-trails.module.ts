import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditTrail } from './models/audit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuditTrail])],
    controllers: [],
    providers: [],
})
export class AuditTrailModule {}