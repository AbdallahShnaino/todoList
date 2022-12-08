import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('CurrentUser CurrentUser => ', request.currentUser);
    return request.currentUser;
  },
);
