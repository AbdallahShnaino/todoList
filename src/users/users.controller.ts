import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { AuthGard } from 'src/guards/auth.guard';
// import { CurrentUser } from 'src/decorators/current-user-decorator';

import { AuthService } from 'src/users/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { serialize } from '../interceptors/serialize-interceptors';
import { User } from './user.entity';
import { UsersService } from './user.service';
@Controller('users')
@serialize(ShowUserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(
    @Body() { fullName, email, password }: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    console.log('HELLO ', fullName, email, password);
    const user = await this.authService.signup(fullName, email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() { email, password }: SignInUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    console.log('route ', session);
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGard)
  whoami(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @Get('/signout')
  signOut(@Session() session: Record<string, any>) {
    session.userId = null;
  }

  @Get('/all')
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async findUserWithId(@Param('id') id: string) {
    return await this.usersService.findWithId(parseInt(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGard)
  async removeUser(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
  ) {
    if (session.userId === parseInt(id)) {
      session.userId = null;
      return await this.usersService.remove(parseInt(id));
    }
    throw new UnauthorizedException();
  }

  @Patch('/:id')
  @UseGuards(AuthGard)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Session() session: Record<string, any>,
  ) {
    if (session.userId === parseInt(id)) {
      return await this.usersService.update(parseInt(id), body);
    }
    throw new UnauthorizedException();
  }

  @Get()
  async getUserWithEmail(@Query('email') email: string) {
    return await this.usersService.findWithEmail(email);
  }
}
