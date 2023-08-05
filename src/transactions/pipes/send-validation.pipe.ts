import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class SendValidationPipe implements PipeTransform {

  transform(value: TransactionDto) {
    const { target_account_id  } = value;

    if (!target_account_id || typeof target_account_id !== 'string') {
      throw new BadRequestException('Missing or invalid target_account_id. It must be a uuid.');
    }
    
    return value;
  }
}