import { Injectable, PipeTransform, BadRequestException, Inject, ArgumentMetadata, ConflictException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TransactionDto } from '../dtos/transaction.dto';
import { AmountMoney } from "../dtos/transaction.dto";
import { extractIdFromUrl, isUUID } from 'src/utils/helpers.util';
import { randomUUID } from 'crypto';

@Injectable()
export class TransactionValidationPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  private readonly allowedFields = ['note', 'amount_money', 'target_account_id'] as const;
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'] as const;

  transform (value: TransactionDto) {
    const { note, amount_money, target_account_id } = value;
    const account_id = extractIdFromUrl(this.request.url);

    if (!account_id) {
      throw new ConflictException('Issue with ID parameter in validation process.')
    }

    // Can use a global ValidationPipe for this in next project (class-validator)
    for (const field of Object.keys(value)) {
      if (!this.allowedFields.includes(field as typeof this.allowedFields[number])) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
    }

    if(this.request.url.endsWith('send')) {
      this.validateTargetAccountId(target_account_id);
    }

    else {
      this.validateAmountMoney(amount_money);
      this.validateNote(note);
    }

    return {
      id: randomUUID(),
      target_account_id: target_account_id,
      note: note,
      amount_money: {
        amount: amount_money.amount,
        currency: amount_money.currency.toUpperCase()
      },
      account_id: account_id
    };
  }

  private validateAmountMoney(amount_money: AmountMoney) {
    const { amount, currency } = amount_money;

    if (!amount_money || typeof amount_money !== 'object') {
      throw new BadRequestException('An amount_money field must be included as an object.');
    } 

    if (this.request.url.endsWith('send')) {
      if (amount_money.amount < 1 || amount_money.amount > 1000) {
        throw new BadRequestException('Amount sent must be between 1 and 1,000 USD.')
      }
    }

    if (!currency || !this.allowedCurrencies.includes(currency.toUpperCase() as typeof this.allowedCurrencies[number])) {
        throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
    }

    if (!amount || typeof amount !== 'number' || amount < 0) {
    throw new BadRequestException('Invalid amount. The amount must be a positive number.');
    }
  }

  private validateTargetAccountId(id: string) {
    if (!id || typeof id !== 'string' || !isUUID(id)) {
      throw new BadRequestException('Missing or invalid target_account_id. It must be a UUID string.');
    }
  }

  private validateNote(note: string) {
    if ((note && note.length) && typeof note !== 'string') {
        throw new BadRequestException('Invalid note. Must be a string of length greater than 0.');
    }
  }

}
