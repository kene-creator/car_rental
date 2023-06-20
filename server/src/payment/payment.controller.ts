import { Body, Controller, Post } from '@nestjs/common';
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
}
