import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface AmountMoney {
    amount: number;
    currency: string;
}

@Entity({ name: 'transaction', schema: 'bank' })
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    target_account_id: string;

    @Column({ type: 'text', nullable: true })
    note: string;

    @Column('jsonb')
    amount_money: AmountMoney;
    
    @Column('uuid')
    account_id: string;
}