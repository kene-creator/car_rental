import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import cuid from 'cuid';
import { CarDto, InitializeDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async initializeTransaction(
    dto: InitializeDto,
    userId: string,
  ): Promise<any> {
    const secretKey = this.configService.get('PAYSTACK_SECRET_KEY');

    console.log(secretKey, dto);

    const params = JSON.stringify({
      email: dto.email,
      amount: dto.amount,
    });

    const options: AxiosRequestConfig = {
      baseURL: 'https://api.paystack.co',
      url: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      data: params,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request(options).pipe(map((res) => res.data)),
      );
      await this.prisma.paystack_Payment_References.create({
        data: {
          id: cuid(),
          authorizationUrl: response.data.authorization_url,
          accessCode: response.data.access_code,
          reference: response.data.reference,
          userId,
        },
      });
      return response;
    } catch (error) {
      throw new Error('Failed to initialize Paystack transaction');
    }
  }

  async verifyTransaction(
    reference: string,
    userId: string,
    cars: CarDto[],
  ): Promise<any> {
    const secretKey = this.configService.get('PAYSTACK_SECRET_KEY');

    const options = {
      baseURL: 'https://api.paystack.co',
      url: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.request(options).pipe(map((res) => res.data)),
      );

      await this.prisma.paystack_Transaction_Verification.create({
        data: {
          id: cuid(),
          userId,
          transactionId: response.data.id,
          domain: response.data.domain,
          status: response.data.status,
          reference: response.data.reference,
          amount: response.data.amount,
          gateway_response: response.data.gateway_response,
          paid_at: response.data.paid_at,
          channel: response.data.channel,
          currency: response.data.currency,
          ip_address: response.data.ip_address,
          attempts: response.data.log.attempts,
          mobile: response.data.log.mobile,
          success_status: response.data.log.success,
          authorization_code: response.data.authorization.authorization_code,
          card_type: response.data.authorization.card_type,
          signature: response.data.authorization.signature,
          first_name: response.data.customer.first_name,
          last_name: response.data.customer.last_name,
          email: response.data.customer.email,
          customer_code: response.data.customer.customer_code,
        },
      });

      if (response.data.status === 'success') {
        const carIds = cars.map((car) => car.id);

        // Check if all car IDs exist in the Car table
        const existingCars = await this.prisma.car.findMany({
          where: {
            id: {
              in: carIds,
            },
          },
        });

        // Check if all car IDs exist in the PopularCar table
        const existingPopularCars = await this.prisma.popularCar.findMany({
          where: {
            id: {
              in: carIds,
            },
          },
        });

        // Connect the car IDs to the respective tables
        const carConnections = existingCars.map((car) => ({ id: car.id }));
        const popularCarConnections = existingPopularCars.map((car) => ({
          id: car.id,
        }));

        // Create the order with the connected car IDs
        await this.prisma.order.create({
          data: {
            id: cuid(),
            userId,
            statusId: 1,
            total: response.data.amount,
            cars: {
              connect: carConnections,
            },
            popularCars: {
              connect: popularCarConnections,
            },
          },
        });
      }

      return response;
    } catch (error) {
      throw new Error('Failed to verify Paystack transaction');
    }
  }
}
