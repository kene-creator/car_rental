import {
  Body,
  Controller,
  HttpCode,
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
@UseGuards(JwtGuard)
export class PaymentController {
  constructor(private readonly paystackService: PaymentService) {}

  @Post('initialize/:userId')
  async initializeTransaction(
    @Body() initializeDto: InitializeDto,
    @Param('userId') userId: string,
    @Body() cars: CarDto[],
  ): Promise<any> {
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
  @HttpCode(200)
  async handleWebhook(@Body() payload: any): Promise<any> {
    await this.paystackService.paystackWebhook(payload);
  }
}
