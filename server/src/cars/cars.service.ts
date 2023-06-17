import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Car, PopularCar } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  public async car(id: string): Promise<Car | null> {
    return this.prisma.car.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  // public async allCars(): Promise<Car[]> {
  //   return this.prisma.car.findMany({});
  // }

  public async allCars(offset: number): Promise<Car[]> {
    const totalCars = await this.prisma.car.count();
    const remainingCars = totalCars - offset;
    const take = remainingCars >= 8 ? 8 : remainingCars;

    if (remainingCars < 8) {
      return this.prisma.car.findMany({}); // Return all cars if remaining cars are less than 8
    }

    return this.prisma.car.findMany({
      take, // Take the appropriate number of cars
      skip: offset, // Skip the specified offset
    });
  }

  async getPopularCars(): Promise<PopularCar[]> {
    return this.prisma.popularCar.findMany({});
  }
}
