import { IsEnum, IsNotEmpty, IsJSON, IsDate } from 'class-validator';
import { Account } from 'src/accounts/models/account.entity';
import { Transaction } from 'src/transactions/models/transaction.entity';

export enum Action {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export enum Entity {
    TRANSACTION = 'Transaction', 
    ACCOUNT = 'Account'
}

export class AuditTrailDto {
    @IsNotEmpty()
    @IsEnum(Entity)
    entity: Entity;
  
    @IsNotEmpty()
    @IsEnum(Action)
    action: Action;

    @IsNotEmpty()
    @IsJSON()
    new_value: Account | Transaction;
  
    @IsNotEmpty()
    @IsDate()
    modified_at: Date;

  }