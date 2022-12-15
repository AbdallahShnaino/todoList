import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { User, UserSchema } from './schema/user.schema';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
