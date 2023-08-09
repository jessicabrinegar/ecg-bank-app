// import { DataSourceOptions, DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Account } from 'src/models/account.entity';
import { Transaction } from 'src/models/transaction.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'league',
    entities: [Account, Transaction],
    subscribers: [],
    migrations: [],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    dropSchema: false,
};
  
  export default config;

// const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'apiuser',
//     password: 'test',
//     database: 'league',
//     entities: [],
//     subscribers: [],
//     migrations: [],
//     namingStrategy: new SnakeNamingStrategy(),
//     synchronize: false,
//     dropSchema: false,
//   });
// export default AppDataSource;

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })

// export default new DataSource(config);