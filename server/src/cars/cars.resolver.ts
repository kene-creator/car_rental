import { Resolver, Query, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from '@prisma/client';

@Injectable()
@Resolver()
export class CarsResolver {
  constructor(private car: CarsService) {}

  // @Query('cars')
  // async getCars() {
  //   return await this.car.allCars();
  // }

  @Query('cars')
  async getCars(
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<Car[]> {
    return await this.car.allCars(offset);
  }

  @Query('car')
  async getCar(@Args('id') id: string) {
    return await this.car.car(id);
  }

  @Query('popular_cars')
  async getPopularCars() {
    return await this.car.getPopularCars();
  }
}
