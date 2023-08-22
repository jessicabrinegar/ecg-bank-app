import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuditTrailModule } from './audit-trails/audit-trails.module';

@Module({
  imports: [DatabaseModule, EventEmitterModule.forRoot(), AccountsModule, TransactionsModule, AuditTrailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//forRoot() initializes the event emitter & registers any declarative
// event listeners that exist within the app
