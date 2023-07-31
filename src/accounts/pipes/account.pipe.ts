// required-fields.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class AccountValidationPipe implements PipeTransform {
  private readonly allowedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
  
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.given_name) {
      throw new BadRequestException('Missing given_name field.');
    }
    if (!value.family_name) {
      throw new BadRequestException('Missing family_name field.');
    }
    if (!value.email_address) {
      throw new BadRequestException('Missing email_address field.');
    }
    if (!value.balance) {
      throw new BadRequestException('Missing balance field.');
    }
    if (typeof value.balance.amount != 'number' || value.balance.amount < 0) {
      throw new BadRequestException('Must provide an amount field that is a non-negative number. If there is no current balance, set amount to 0');
    }
    if (!value.balance.currency) {
      throw new BadRequestException('Missing currency field.');
    }
    const currency = value.balance.currency.toUpperCase();
    if (!this.allowedCurrencies.includes(currency)) {
      throw new BadRequestException(`Invalid currency. Supported currencies are: ${this.allowedCurrencies.join(', ')}`);
    }
    return value;
  }
}
