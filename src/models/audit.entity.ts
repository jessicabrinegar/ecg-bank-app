import { Account } from 'src/models/account.entity';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp, Transaction } from 'typeorm';

@Entity()
export class Audit {
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