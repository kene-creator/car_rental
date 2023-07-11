import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from '@app/shared/interceptors/timeout.interceptors';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => {
        const timeoutValue = 6000;
        return new TimeoutInterceptor(timeoutValue);
      },
    },
    CarsService,
    CarsResolver,
  ],
  exports: [CarsService],
})
export class CarsModule {}
