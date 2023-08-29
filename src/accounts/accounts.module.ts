import { Global, Logger, Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Account } from 'src/accounts/models/account.entity';
import { AuditTrail } from 'src/audit-trails/models/audit.entity';
import { AccountsRepository } from './accounts.repository';
import { AuditTrailRepository } from 'src/audit-trails/audit-trail.repository';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global() // creates single instance for entire app
@Module({
  imports: [TypeOrmModule.forFeature([Account, AuditTrail]), DatabaseModule, EventEmitterModule.forRoot()],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository, AuditTrailRepository, Logger],
  exports: [AccountsService, AccountsRepository],
})
export class AccountsModule {}

