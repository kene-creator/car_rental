import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserInterceptor } from '../auth/interceptors/user.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@UseInterceptors(UserInterceptor)
@Controller('users')
export class UserController {
  @Get('user')
  getUser(@GetUser() user: User) {
    return user;
  }
}
