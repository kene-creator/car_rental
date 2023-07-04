import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CarDto, InitializeDto } from './dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paystackService: PaymentService) {}

  @Post('initialize/:userId')
  @UseGuards(AuthGuard)
  async initializeTransaction(
    @Body() payload: { initializeDto: InitializeDto; cars: CarDto[] },
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<any> {
    const { initializeDto, cars } = payload;
    const transaction = await this.paystackService.initializeTransaction(
      initializeDto,
      userId,
      cars,
    );

    return transaction;
  }

  @Post('verify')
  async handleWebhook(@Body() payload: any): Promise<void> {
    try {
      await this.paystackService.paystackWebhook(payload);
    } catch (error) {
      throw new HttpException(
        'Failed to verify Paystack transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
