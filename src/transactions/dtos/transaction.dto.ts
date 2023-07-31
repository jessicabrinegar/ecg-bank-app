export class TransactionDto {
    target_account_id: string | null;
    note: string | null;
    amount_money: {
        amount: number;
        currency: string;
    }
}