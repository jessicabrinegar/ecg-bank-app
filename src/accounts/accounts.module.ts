import { Global, Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Account } from 'src/accounts/models/account.entity';
import { AuditTrail } from 'src/audit-trails/models/audit.entity';
import { AccountsRepository } from './accounts.repository';

@Global() // creates single instance for entire app
@Module({
  imports: [TypeOrmModule.forFeature([Account, AuditTrail]), DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
  exports: [AccountsService, AccountsRepository],
})
export class AccountsModule {}

