import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionValidationPipe implements PipeTransform {
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];

  transform(value: TransactionDto, metadata: ArgumentMetadata) {
    if (!value.amount_money) {
      console.log(value.amount_money);
      throw new BadRequestException('Missing amount_money field.');
    }
    if(!value.amount_money.amount) {
        throw new BadRequestException('Missing amount field.');
    }
    if(!value.amount_money.currency) {
        throw new BadRequestException('Missing currency field.')
    }
    const currency = value.amount_money.currency.toUpperCase();
    if (!this.allowedCurrencies.includes(currency)) {
      throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
    }
    return value;
  }
}
