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

  public async allCars(): Promise<Car[]> {
    return this.prisma.car.findMany({});
  }

  async getPopularCars(): Promise<PopularCar[]> {
    return this.prisma.popularCar.findMany({});
  }
}
