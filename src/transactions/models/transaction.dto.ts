export interface AmountMoney {
    amount: number;
    currency: string;
}
export class TransactionDto {
    id: string;
    target_account_id: string | null;
    note: string | null;
    amount_money: AmountMoney;
    account_id: string;
}