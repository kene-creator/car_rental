import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { MailService } from './mail.service';
import { AuthGuard } from './guard/auth.guard';
import { UserInterceptor } from './interceptors/user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '@app/shared/interceptors/timeout.interceptors';

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
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => {
        const timeoutValue = 30000;
        return new TimeoutInterceptor(timeoutValue);
      },
    },
    AuthService,
    JwtStrategy,
    MailService,
    AuthGuard,
    UserInterceptor,
  ],
  exports: [AuthGuard, UserInterceptor, AuthService],
})
export class AuthModule {}
