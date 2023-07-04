import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { MailService } from './mail.service';
import { AuthGuard } from './guard/auth.guard';
import { UserInterceptor } from './interceptors/jwt.interceptor';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    MailService,
    AuthGuard,
    UserInterceptor,
  ],
  exports: [AuthGuard, UserInterceptor, AuthService],
})
export class AuthModule {}
