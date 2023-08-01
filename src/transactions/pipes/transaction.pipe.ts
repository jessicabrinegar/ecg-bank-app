import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionValidationPipe implements PipeTransform {
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];

  transform(value: TransactionDto, metadata: ArgumentMetadata) {
    const { target_account_id, note, amount_money } = value;

    if (
      !amount_money ||
      typeof amount_money !== 'object' ||
      amount_money.amount <= 0 ||
      typeof amount_money.amount !== 'number' ||
      typeof amount_money.currency !== 'string'
    ) {
      throw new BadRequestException('Invalid amount_money field. It should be an object with amount and currency fields. Amount should be a number greater than 0. Currency should be a string.');
    }

    const currency = amount_money.currency.toUpperCase();

    if (!this.allowedCurrencies.includes(currency)) {
      throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
    }

    if (note !== undefined && typeof note !== 'string') {
      throw new BadRequestException('Invalid note. It should be a string.');
    }

    return value;
  }
}
