import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findWithId(userId);
      req.currentUser = user;
    }
    next();
  }
}
