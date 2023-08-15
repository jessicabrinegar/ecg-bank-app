import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/models/account.entity';

export interface AmountMoney {
    amount: number;
    currency: string;
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column('jsonb')
    amount_money: AmountMoney;

    @ManyToOne(() => Account, account => account.transactions)
    @JoinColumn({ name: 'account_id' })
    account: Account;
  
    @ManyToOne(() => Account, account => account.targetTransactions)
    @JoinColumn({ name: 'target_account_id' })
    targetAccount: Account;
}