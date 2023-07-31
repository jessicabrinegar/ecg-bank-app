import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { TransactionDto } from '../dtos/transaction.dto';

@Injectable()
export class SendValidationPipe implements PipeTransform {
  transform(value: TransactionDto, metadata: ArgumentMetadata) {
    console.log(metadata);
    
    if (!value.target_account_id) {
      throw new BadRequestException('Missing target_account_id field.');
    }
    return value;
  }
}