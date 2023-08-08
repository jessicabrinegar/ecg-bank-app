import { Global, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AllTransactionsController } from './get-all-transactions.controller';
import { AccountsService } from 'src/accounts/accounts.service';
import { AccountsModule } from 'src/accounts/accounts.module';
// import { AccountsController } from 'src/accounts/accounts.controller';

@Global()
@Module({
  imports: [AccountsModule],
  controllers: [TransactionsController, AllTransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
