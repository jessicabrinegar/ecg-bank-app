import { UUID } from "crypto";

export class PostAccountDto {
    id: UUID;
    given_name: string;
    family_name: string;
    email_address: string;
    note: string;
    balance: {
        amount: number;
        currency: string;
    }
}