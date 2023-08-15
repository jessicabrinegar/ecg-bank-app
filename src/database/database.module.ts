import { Module, Global } from '@nestjs/common';
import { DatabaseProvider } from './config/database.providers';

@Global()
@Module({
  imports: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {} 