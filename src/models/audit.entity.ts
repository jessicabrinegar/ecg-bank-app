import { Account } from 'src/models/account.entity';
import { Transaction } from './transaction.entity';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class AuditTrail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    entity: 'Transaction' | 'Account';

    @Column()
    action: 'CREATE' | 'UPDATE' | 'DELETE';

    @Column('jsonb')
    new_value: Account | Transaction;

    @Column('timestamp')
    modified_at: Timestamp;
}