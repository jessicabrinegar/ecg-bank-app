import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventEmitterModule.forRoot(), DatabaseModule, AccountsModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
