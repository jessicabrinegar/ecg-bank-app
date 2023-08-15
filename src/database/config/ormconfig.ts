import { DataSourceOptions, DataSource } from 'typeorm';
import { Account } from 'src/accounts/models/account.entity';
import { Transaction } from 'src/transactions/models/transaction.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuditTrail } from 'src/audit-trails/models/audit.entity';

export const config: DataSourceOptions = {
    type: 'postgres',
    host: 'c_bank_db',
    port: 5432,
    username: 'apiuser',
    password: 'dbuser123',
    database: 'bank',
    entities: [Account, Transaction, AuditTrail],
    subscribers: [],
    migrations: [__dirname + "/../migrations/*.{ts, js}"],
    migrationsTransactionMode: 'each',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    dropSchema: false,
};
// data source initialized for migration purpose.
export default new DataSource(config);