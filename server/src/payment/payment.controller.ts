import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtGuard } from 'src/auth/guard';
import { CarDto, InitializeDto } from './dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paystackService: PaymentService) {}

  @Post('initialize/:userId')
  @UseGuards(JwtGuard)
  async initializeTransaction(
    @Body() payload: { initializeDto: InitializeDto; cars: CarDto[] },
    @Param('userId') userId: string,
  ): Promise<any> {
    const { initializeDto, cars } = payload;
    const transaction = await this.paystackService.initializeTransaction(
      initializeDto,
      userId,
      cars,
    );

    return transaction;
  }

  // @Post('/:reference/:userId')
  // async verifyTransaction(
  //   @Param('reference') reference: string,
  //   @Param('userId') userId: string,
  //   @Body() cars: CarDto[],
  // ): Promise<any> {
  //   try {
  //     const transaction = await this.paystackService.verifyTransaction(
  //       reference,
  //       userId,
  //       cars,
  //     );
  //     return transaction;
  //   } catch (error) {
  //     throw new HttpException(
  //       'Failed to verify Paystack transaction',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

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
