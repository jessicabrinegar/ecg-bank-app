// required-fields.pipe.ts
import { Injectable, PipeTransform, BadRequestException, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { AccountDto } from '../dtos/account.dto';
import { isEmailAddress } from '../../utils/helpers.util';
import { Balance } from '../dtos/account.dto';

@Injectable()
export class AccountValidationPipe implements PipeTransform {
  // Access information relating to the request
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'] as const;
  private readonly allowedFields = ['given_name', 'family_name', 'email_address', 'balance', 'note'] as const;
  private readonly allowedUpdateFields = ['given_name', 'family_name', 'email_address'] as const;

  transform(value: AccountDto) {
    const {given_name, family_name, email_address, note, balance} = value;
    // if user is sending a patch request to update their account
    if (this.request.method === 'PATCH') {
      this.validateUpdateAccount(value);
      return value;
    }

    else {
      for (const field of Object.keys(value)) {
        if (!this.allowedFields.includes(field as typeof this.allowedFields[number])) {
          throw new BadRequestException(`Invalid field: ${field}`);
        }
      }
      this.validateBalance(balance);
      this.validateNote(note);
      this.validateName(given_name, family_name);
      this.validateEmail(email_address);
    }

    return {
      id: randomUUID(),
      given_name: given_name,
      family_name: family_name,
      email_address: email_address,
      balance: {
        amount: balance.amount,
        currency: value.balance.currency.toUpperCase()
      }
    };
  }

  private validateUpdateAccount(value: AccountDto) {
    for (const field of Object.keys(value)) {
      if (!this.allowedUpdateFields.includes(field as typeof this.allowedUpdateFields[number])) {
        throw new BadRequestException(`Invalid field: ${field}. Fields that can be updated are given_name, family_name, and email_address.`);
      }
      if (typeof value[field] !== 'string' || !value[field].length) {
        throw new BadRequestException(`Field ${field} must have content that is of type string`);
      }
      if (field === 'email_address' && !isEmailAddress(value[field])) {
        throw new BadRequestException(`Field ${field} must be of the following format: username@domain.extension`);
      }
    }
  }

  private validateBalance(balance: Balance) {
      if (!balance || typeof balance !== 'object') {
        throw new BadRequestException('Invalid or missing balance field. Must be an object with an amount and currency field.');
      }
      if (balance.amount === undefined || !balance.currency) {
        throw new BadRequestException('An amount and currency field must be included within the balance field.');
      }
      if (typeof balance.amount !== 'number' || balance.amount < 0) {
        throw new BadRequestException('Amount must be a positive number or 0.');
      }
      if (typeof balance.currency !== 'string') {
        throw new BadRequestException('Currency field must be a string');
      }

      if (!this.allowedCurrencies.includes(balance.currency.toUpperCase() as typeof this.allowedCurrencies[number])) {
        throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
      }
  }

  private validateName(given_name: string, family_name: string) {
    if (!given_name || typeof given_name !== 'string') {
      throw new BadRequestException('Invalid given_name. Must be included as a string.');
    }

    if (!family_name || typeof family_name !== 'string') {
      throw new BadRequestException('Invalid family_name. Must be included as a string.');
    }
  }

  private validateEmail(email: string) {
    if (!email || !isEmailAddress(email)) {
      throw new BadRequestException('Must provide a valid email_address.');
    }
  }

  private validateNote(note: string) {
    if (note !== undefined && typeof note !== 'string') {
      throw new BadRequestException('Invalid note field. Must be a string');
    }
  }

}
