// required-fields.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PostAccountDto } from '../dtos/post-account.dto';

export function isEmailAddress(str: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(str);
}


@Injectable()
export class AccountValidationPipe implements PipeTransform {
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
  private readonly allowedFields = ['given_name', 'family_name', 'email_address', 'balance', 'note'];
  
  transform(value: PostAccountDto) {
    const {given_name, family_name, email_address, note, balance} = value;

    for (const field of Object.keys(value)) {
      if (!this.allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
    }

    if (!given_name || typeof given_name !== 'string') {
      console.log(value);
      throw new BadRequestException('Invalid given_name. Must be included as a string.');
    }

    if (!family_name || typeof family_name !== 'string') {
      throw new BadRequestException('Invalid family_name. Must be included as a string.');
    }

    if (!email_address || typeof email_address !== 'string') {
      throw new BadRequestException('Invalid email_address. Must be included as a string.');
    }
    
    if (!isEmailAddress(email_address)) {
      throw new BadRequestException('Invalid email_address. Must be of the following format: username@domain.extension');
    }

    if (note && typeof note !== 'string') {
      throw new BadRequestException('Invalid note. Must be a string.');

    }

    if (
      !balance ||
      typeof balance !== 'object' ||
      typeof balance.amount !== 'number' ||
      balance.amount < 0 ||
      typeof balance.currency !== 'string'
    ) {
      throw new BadRequestException('Invalid balance. It should be an object with an amount and currency field. Amount should be a non-negative number and currency should be a string.');
    }

    value.balance.currency = value.balance.currency.toUpperCase();

    if (!this.allowedCurrencies.includes(value.balance.currency)) {
      throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
    }

    return value;
  }
}