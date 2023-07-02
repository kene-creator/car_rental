import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMailService } from './payment_mail.service';
import { PaymentController } from './payment.controller';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PaymentService, PaymentMailService],
  controllers: [PaymentController],
})
export class PaymentModule {}
