import { Global, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AllTransactionsController } from './get-all-transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Transaction } from 'src/transactions/models/transaction.entity';
import { AuditTrail } from 'src/audit-trails/models/audit.entity';
import { DatabaseModule } from 'src/database/database.module';
import { Account } from 'src/accounts/models/account.entity';
import { TransactionsRepository } from './transactions.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, AuditTrail, Account]), AccountsModule, DatabaseModule],
  controllers: [TransactionsController, AllTransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService]
})
export class TransactionsModule {}
