import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AllTransactionsController } from './get-all-transactions.controller';
import { AccountsService } from 'src/accounts/accounts.service';
// import { AccountsController } from 'src/accounts/accounts.controller';

@Module({
  controllers: [TransactionsController, AllTransactionsController],
  providers: [TransactionsService, AccountsService]
})
export class TransactionsModule {}
