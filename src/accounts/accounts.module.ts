import { Global, Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/models/account.entity';
import { AuditTrail } from 'src/audit-trails/models/audit.entity';

@Global() // creates single instance for entire app
@Module({
  imports: [TypeOrmModule.forFeature([Account, AuditTrail])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}

