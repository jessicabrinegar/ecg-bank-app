import { IsEnum, IsNumber, IsString, ValidateNested, IsEmail, Min, IsNotEmpty, IsObject, IsOptional, IsEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Currency } from 'src/accounts/models/account.dto';


export class AmountMoney {
    @IsNumber()
    @Min(1)
    amount: number;

    @IsEnum(Currency)
    currency: Currency;
}
export class TransactionDto {
    @IsOptional()
    @IsString()
    note: string | null;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(()=> AmountMoney)
    amount_money: AmountMoney;
}

export class SendDto extends TransactionDto {
    @IsUUID()
    target_account_id: string;
}