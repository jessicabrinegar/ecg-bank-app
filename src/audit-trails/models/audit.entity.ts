import { Account } from 'src/accounts/models/account.entity';
import { Transaction } from '../../transactions/models/transaction.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'audit-trail', schema: 'audit'})
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
    modified_at: Date;
}