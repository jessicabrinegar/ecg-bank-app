import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

/**
 * Database provider
 *
 * contains database factory provider
 * we use TypeOrmModule here and add connection
 */
/* forRootAsync is helpful when you need an async setup, 
 such as needing to fetch config data from external resources
 E.g., export const DatabaseProvider = TypeOrmModule.forRootAsync({
     useFactory: () => config,
 }); */

export const DatabaseProvider = TypeOrmModule.forRoot(config);
  