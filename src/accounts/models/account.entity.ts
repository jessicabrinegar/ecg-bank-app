import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../../transactions/models/transaction.entity';

export interface Balance {
    amount: number;
    currency: string;
}

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    given_name: string;

    @Column('text')
    family_name: string;

    @Column('text')
    email_address: string;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column('jsonb')
    balance: Balance;

    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction[];

    @OneToMany(() => Transaction, transaction => transaction.targetAccount)
    targetTransactions: Transaction[];
}