import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import cuid from 'cuid';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async initializeTransaction(email: string, amount: string): Promise<any> {
    const secretKey = this.configService.get('PAYSTACK_SECRET_KEY');

    const params = JSON.stringify({
      email,
      amount,
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
        },
      });
      console.log(cuid());
      return response;
    } catch (error) {
      throw new Error('Failed to initialize Paystack transaction');
    }
  }
}
