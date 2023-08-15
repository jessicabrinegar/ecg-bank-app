import { IsJSON, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Balance {
    @IsNotEmpty()
    @IsNumber()
    amount: number;
    @IsNotEmpty()
    @IsString()
    currency: string;
}

export class AccountDto {
    @IsUUID('4')
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsString()
    given_name: string; 

    @IsNotEmpty()
    @IsString()
    family_name: string;

    @IsNotEmpty()
    @IsString()
    email_address: string;

    @IsString()
    note: string | null;

    @IsJSON()
    @ValidateNested()
    @Type(()=> Balance)
    balance: Balance;
}