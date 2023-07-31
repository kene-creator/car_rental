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
import {
  AuthDto,
  CreateUserDto,
  UpdatePasswordDto,
  ResetPasswordDto,
} from './dto';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UserRequest } from './interface/user-request.interface';
import { Role } from './enums/roles.enums';
import { User } from '@prisma/client';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() dto: CreateUserDto,
  ): Promise<{ access_token: string; verification_token: string }> {
    return this.authService.signup(dto, [Role.USER]);
  }

  @Post('signup/admin')
  async signupAdmin(
    @Body() dto: CreateUserDto,
  ): Promise<{ access_token: string; verification_token: string }> {
    try {
      return await this.authService.signup(dto, [Role.ADMIN]);
    } catch (error) {
      throw error;
    }
  }

  @Post('signin')
  signin(@Body() dto: AuthDto): Promise<{ access_token: string; user: User }> {
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
  async logout(@Req() req: UserRequest): Promise<{ message: string }> {
    delete req.user;
    return { message: 'Logout successful' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(dto);
    return { message: 'Password reset request sent' };
  }

  @Post('update-password/:token')
  async updatePassword(
    @Param('token') token: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.updatePassword(token, dto.password);
    return { message: 'Password update successful' };
  }
}
