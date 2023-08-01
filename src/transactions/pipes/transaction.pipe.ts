import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionValidationPipe implements PipeTransform {
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
  private readonly allowedFields = ['note', 'amount_money', 'target_account_id'];

  transform(value: TransactionDto, metadata: ArgumentMetadata) {
    const { note, amount_money } = value;

    for (const field of Object.keys(value)) {
      if (!this.allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
    }

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
