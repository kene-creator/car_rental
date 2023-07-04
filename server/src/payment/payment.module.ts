import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMailService } from './payment_mail.service';
import { PaymentController } from './payment.controller';

import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentMailService],
})
export class PaymentModule {}
