import { IsEnum, IsNotEmpty, IsUUID, IsJSON, IsDate } from 'class-validator';
import { Account } from 'src/accounts/models/account.entity';
import { Transaction } from 'src/transactions/models/transaction.entity';

enum Action {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

enum Entity {
    TRANSACTION = 'Transaction', 
    ACCOUNT = 'Account'
}

export class AuditTrailDto {
    @IsNotEmpty()
    @IsUUID('4')
    id: string;

  
    @IsNotEmpty()
    @IsEnum(Entity)
    entity: Entity;
  
    /**
     * @example 'CREATE"
     */
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