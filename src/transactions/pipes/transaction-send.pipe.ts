import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class SendValidationPipe implements PipeTransform {
  transform(value: TransactionDto, metadata: ArgumentMetadata) {
    const { target_account_id, note, amount_money } = value;

    if (typeof target_account_id !== 'string') {
      throw new BadRequestException('Invalid target_account_id. It must be a uuid.');
    }

    if (!target_account_id) {
      throw new BadRequestException('Missing target_account_id field.');
    }
    
    return value;
  }
}