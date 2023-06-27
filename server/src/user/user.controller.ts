import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('user')
  getUser(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({ email });
    return user;
  }
}
