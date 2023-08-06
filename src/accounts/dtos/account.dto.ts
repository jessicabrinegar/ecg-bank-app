export interface Balance {
    amount: number;
    currency: string;
}

export interface AccountDto {
    id: string;
    given_name: string;
    family_name: string;
    email_address: string;
    note: string | null;
    balance: Balance;
}