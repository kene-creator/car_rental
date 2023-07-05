import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UserRequest } from './interface/user-request.interface';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Get('email/verify/:token')
  async verifyEmail(
    @Param('token') token: string,
  ): Promise<{ message: string; valid: boolean }> {
    try {
      const verificationResult = await this.authService.verifyEmail(token);

      if (verificationResult) {
        //* Email verification successful
        return {
          message: 'Email verification successful',
          valid: verificationResult,
        };
      } else {
        //! Email verification failed
        return {
          message: 'Email verification failed',
          valid: verificationResult,
        };
      }
    } catch (error) {
      return { message: error.message, valid: false };
    }
  }

  @Post('logout')
  @UseInterceptors(UserInterceptor)
  async logout(@Req() req: UserRequest) {
    delete req.user;
    return { message: 'Logout successful' };
  }
}
