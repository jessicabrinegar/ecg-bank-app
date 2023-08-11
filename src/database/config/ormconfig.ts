import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from 'src/models/account.entity';
import { Transaction } from 'src/models/transaction.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Audit } from 'src/models/audit.entity';

export const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'apiuser',
    password: 'test',
    database: 'bank',
    entities: [Account, Transaction, Audit],
    subscribers: [],
    migrations: ["../migrations/*.ts"],
    migrationsTransactionMode: 'each',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    dropSchema: false,
};
// data source initialized for migration purpose.
export default new DataSource(config);


// const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'apiuser',
//     password: 'test',
//     database: 'bank',
//     entities: [Account, Transaction, Audit],
//     subscribers: [],
//     migrations: ["../migrations/*.ts"],
//     namingStrategy: new SnakeNamingStrategy(),
//     synchronize: true,
//     dropSchema: false,
//   });
// export default AppDataSource;
// AppDataSource.initialize()

// config.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })

// export default new DataSource(config);