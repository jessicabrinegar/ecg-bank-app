import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface Balance {
    amount: number;
    currency: string;
}

@Entity({ name: 'account', schema: 'bank' })
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
}