import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './database/config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
// import { Account } from './accounts/models/account.entity';
// import { Transaction } from './transactions/models/transaction.entity';
// import { AuditTrail } from './audit-trails/models/audit.entity';

@Module({
  imports: [DatabaseModule, AccountsModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
