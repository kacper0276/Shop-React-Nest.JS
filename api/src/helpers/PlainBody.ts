import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const PlainBody = createParamDecorator(
  async (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const returnedData = Object.getOwnPropertyNames(req.body);

    return returnedData.length > 0 ? returnedData[0] : null;
  },
);
