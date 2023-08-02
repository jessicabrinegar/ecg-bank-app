import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PostAccountDto } from '../dtos/post-account.dto';
import { isEmailAddress } from './account.pipe';

@Injectable()
export class AccountUpdateValidationPipe implements PipeTransform {
  transform(value: Partial<PostAccountDto>) {
    const allowedFields = ['given_name', 'family_name', 'email_address'];

    for (const field of Object.keys(value)) {
      if (!allowedFields.includes(field)) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }

      if (!value[field] || typeof value[field] !== 'string') {
        throw new BadRequestException(`Field ${field} should be included as a string`);
      }

      if (field === 'email_address' && !isEmailAddress(value[field])) {
        throw new BadRequestException(`Field ${field} must be of the following format: username@domain.extension`);
      } 
    }

    return value;
  }
}
