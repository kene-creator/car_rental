import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import cuid from 'cuid';
import { CarDto, InitializeDto } from './dto';
import { PaymentMailService } from './payment_mail.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly mailService: PaymentMailService,
  ) {}

  async initializeTransaction(
    dto: InitializeDto,
    userId: string,
    carDto: CarDto[],
  ): Promise<any> {
    const secretKey = this.configService.get('PAYSTACK_SECRET_KEY');

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
      const carIds = carDto.map((car) => car.id);

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

      await this.prisma.paystack_Payment_References.create({
        data: {
          id: cuid(),
          authorizationUrl: response.data.authorization_url,
          accessCode: response.data.access_code,
          reference: response.data.reference,
          userId,
          cars: {
            connect: carConnections,
          },
          popularCars: {
            connect: popularCarConnections,
          },
        },
      });
      return response;
    } catch (error) {
      throw new Error('Failed to initialize Paystack transaction');
    }
  }

  async paystackWebhook(payload: any): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: payload.data.customer.email,
        },
      });

      await this.prisma.paystack_Transaction_Verification.create({
        data: {
          id: cuid(),
          userId: user.id,
          transactionId: payload.data.id,
          domain: payload.data.domain,
          status: payload.data.status,
          reference: payload.data.reference,
          amount: payload.data.amount,
          gateway_response: payload.data.gateway_response,
          paid_at: payload.data.paid_at,
          channel: payload.data.channel,
          currency: payload.data.currency,
          ip_address: payload.data.ip_address,
          attempts: payload.data.log?.attempts,
          mobile: payload.data.log?.mobile,
          success_status: payload.data.log?.success,
          authorization_code: payload.data.authorization.authorization_code,
          card_type: payload.data.authorization.card_type,
          signature: payload.data.authorization.signature,
          first_name: payload.data.customer.first_name,
          last_name: payload.data.customer.last_name,
          email: payload.data.customer.email,
          customer_code: payload.data.customer.customer_code,
        },
      });

      if (payload.data.status === 'success') {
        await this.prisma.order.create({
          data: {
            id: cuid(),
            userId: user.id,
            statusId: 1,
            total: payload.data.amount,
          },
        });

        const referenceId = payload.data.reference;

        const result = await this.prisma.paystack_Payment_References.findFirst({
          where: {
            reference: referenceId,
          },
          include: {
            cars: true,
            popularCars: true,
          },
        });

        const orderedCars = result.cars.map((car) => car.id);
        const orderedPopularCars = result.popularCars.map((car) => car.id);

        const userEmail = payload.data.customer.email;
        const userId = user.id;
        const orderId = referenceId;
        const products =
          orderedCars.length > 0 ? orderedCars : orderedPopularCars;
        const total = payload.data.amount;

        await this.mailService.orderMail(
          userEmail,
          userId,
          orderId,
          products,
          total,
        );
      }
    } catch (error) {
      throw new Error('Failed to verify Paystack transaction');
    }
  }
}
