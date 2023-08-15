import { Global, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AllTransactionsController } from './get-all-transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Transaction } from 'src/transactions/models/transaction.entity';
import { Audit } from 'src/audit-trails/models/audit.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Audit]),AccountsModule],
  controllers: [TransactionsController, AllTransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
