import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtGuard } from 'src/auth/guard';
import { InitializeDto } from './dto';

@Controller('payment')
@UseGuards(JwtGuard)
export class PaymentController {
  constructor(private readonly paystackService: PaymentService) {}

  @Post('initialize')
  async initializeTransaction(
    @Body() initializeDto: InitializeDto,
  ): Promise<any> {
    const transaction = await this.paystackService.initializeTransaction(
      initializeDto,
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
