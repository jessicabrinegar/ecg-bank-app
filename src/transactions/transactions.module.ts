import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import { AllTransactionsController } from './get-all-transactions.controller';

@Module({
  controllers: [TransactionsController, AllTransactionsController],
  providers: [TransactionsService, TransactionsRepository]
})
export class TransactionsModule {}
