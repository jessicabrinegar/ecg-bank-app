import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class SendValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.target_account_id) {
      throw new BadRequestException('Missing target_account_id field.');
    }
    return value;
  }
}