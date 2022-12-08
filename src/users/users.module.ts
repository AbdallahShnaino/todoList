import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { usersProviders } from './user.providers';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, PasswordService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
