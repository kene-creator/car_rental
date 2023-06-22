import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paystackService: PaymentService) {}

  @Post('initialize')
  async initializeTransaction(
    @Body('email') email: string,
    @Body('amount') amount: string,
  ): Promise<any> {
    const transaction = await this.paystackService.initializeTransaction(
      email,
      amount,
    );

    return transaction;
  }

  @Get('verify/:reference')
  async verifyTransaction(@Param('reference') reference: string): Promise<any> {
    try {
      const transaction = await this.paystackService.verifyTransaction(
        reference,
      );
      return transaction;
    } catch (error) {
      throw new HttpException(
        'Failed to verify Paystack transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
