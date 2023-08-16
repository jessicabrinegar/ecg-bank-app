import { IsEnum, IsNumber, IsString, ValidateNested, IsEmail, Min, IsNotEmpty, IsObject, IsOptional, IsEmpty } from 'class-validator';
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
    @Min(0)
    amount: number;

    @IsEnum(Currency)
    currency: Currency;
}

export class AccountDto {
    @IsNotEmpty()
    @IsString()
    given_name: string; 

    @IsNotEmpty()
    @IsString()
    family_name: string;

    @IsEmail()
    email_address: string;

    @IsOptional()
    @IsString()
    note: string | null;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(()=> Balance)
    balance: Balance;
}