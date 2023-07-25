import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [AccountsModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
