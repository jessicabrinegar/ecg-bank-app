import { IsEnum, IsJSON, IsEmpty, IsNumber, IsString, IsUUID, ValidateNested, IsEmail, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    JPY = 'JPY',
    CNY = 'CNY'
}

export class Balance {

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsEnum(Currency)
    currency: Currency;
}

export class AccountDto {
    @IsUUID('4')
    id: string;

    @IsEmpty()
    @IsString()
    given_name: string; 

    @IsEmpty()
    @IsString()
    family_name: string;

    @IsEmpty()
    @IsEmail()
    email_address: string;

    @IsString()
    note: string | null;

    @IsEmpty()
    @IsJSON()
    @ValidateNested()
    @Type(()=> Balance)
    balance: Balance;
}