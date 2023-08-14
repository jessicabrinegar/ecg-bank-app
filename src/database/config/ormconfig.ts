import { DataSourceOptions, DataSource } from 'typeorm';
import { Account } from 'src/models/account.entity';
import { Transaction } from 'src/models/transaction.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Audit } from 'src/models/audit.entity';

export const config: DataSourceOptions = {
    type: 'postgres',
    host: 'c_bank_db',
    port: 5432,
    username: 'apiuser',
    password: 'dbuser123',
    database: 'bank',
    entities: [Account, Transaction, Audit],
    subscribers: [],
    migrations: [__dirname + "/../migrations/*.{ts, js}"],
    migrationsTransactionMode: 'each',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    dropSchema: false,
};
// data source initialized for migration purpose.
export default new DataSource(config);