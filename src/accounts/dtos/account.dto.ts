export interface AccountDto {
    id: string;
    given_name: string;
    family_name: string;
    email_address: string;
    note: string | null;
    balance: {
        amount: number;
        currency: string;
    }
}