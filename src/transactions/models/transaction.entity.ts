import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/models/account.entity';

export interface AmountMoney {
    amount: number;
    currency: string;
}

@Entity({ name: 'transaction', schema: 'bank'})
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    note: string | null;

    @Column('jsonb')
    amount_money: AmountMoney;

    @ManyToOne(type => Account, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'account_id'})
    account: Account;
  
    @ManyToOne(type => Account)
    @JoinColumn({name: 'target_account_id'})
    target_account: Account;
}