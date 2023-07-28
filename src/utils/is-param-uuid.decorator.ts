import { createParamDecorator, BadRequestException } from '@nestjs/common';
import { isUUID } from './uuid.util';

export const IsParamUUID = createParamDecorator((data, ctx) => {
  // execution context class can obtain the underlying http req & resp objects
  const req = ctx.switchToHttp().getRequest();
  const id = req.params.id;

  if (!isUUID(id)) {
    throw new BadRequestException('The account ID must be a 36-character UUID');
  }

  return id;
});
