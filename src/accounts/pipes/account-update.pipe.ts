import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PostAccountDto } from '../dtos/post-account.dto';

@Injectable()
export class AccountUpdateValidationPipe implements PipeTransform {
  transform(value: Partial<PostAccountDto>) {
    const allowedFields = ['given_name', 'family_name', 'email_address'];

    for (const field of Object.keys(value)) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }

      if (typeof value[field] !== 'string') {
        throw new BadRequestException(`Field ${field} should be a string`);
      }
    }

    return value;
  }
}
