import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
// import { DatabaseProvider } from './database/config/database.providers';
// import { DataSource } from 'typeorm';
// import { config } from './database/config/ormconfig';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, AccountsModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
