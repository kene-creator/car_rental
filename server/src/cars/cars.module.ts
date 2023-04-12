import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';

@Module({
  imports: [],
  providers: [CarsService, CarsResolver],
  exports: [CarsService],
})
export class CarsModule {}
