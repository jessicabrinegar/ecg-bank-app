import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';
import { AmountMoney } from "../dtos/transaction.dto";
// import { validateRequestBody } from '../utils/validate-rb.util';

@Injectable()
export class TransactionValidationPipe implements PipeTransform {
  private readonly allowedFields = ['note', 'amount_money', 'target_account_id'] as const;
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'] as const;

  transform (value: Partial<TransactionDto>) {
    const { note, amount_money } = value;
    // Can use a global ValidationPipe for this in next project (class-validator)
    for (const field of Object.keys(value)) {
      if (!this.allowedFields.includes(field as typeof this.allowedFields[number])) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
    }

    if (!amount_money || typeof amount_money !== 'object') {
      throw new BadRequestException('An amount_money field must be included as an object.');
    } 
    else {
      this.validateAmountMoney(amount_money);
      this.validateNote(note);
      amount_money.currency = amount_money.currency.toUpperCase();
    }

    // return {
    //   id: randomUUID(),
    //   note: note,
    //   account_id: metadata.data
    // };
    return value;
  }

  private validateAmountMoney(amount_money: AmountMoney) {
    const { amount, currency } = amount_money;

    if (!currency || !this.allowedCurrencies.includes(currency as typeof this.allowedCurrencies[number])) {
        throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
    }

    if (!amount || typeof amount !== 'number' || amount < 0) {
    throw new BadRequestException('Invalid amount. The amount must be a positive number.');
    }
  }

  private validateNote(note: string) {
    if ((note && note.length) && typeof note !== 'string') {
        throw new BadRequestException('Invalid note. Must be a string of length greater than 0.');
    }
  }

}
