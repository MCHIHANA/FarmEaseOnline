// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { ConfigModule } from '@nestjs/config';
import { PaymentService } from './payments.service';
import { PaymentController } from './payments.controller';

@Module({
  imports: [
    HttpModule,          // Add HttpModule here
    ConfigModule,        // Import ConfigModule if you are using ConfigService
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}




