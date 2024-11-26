import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Get available payment options
  @Get('options')
  async getPaymentOptions() {
    try {
      return await this.paymentService.getPaymentOptions();
    } catch (error) {
      console.error('Error retrieving payment options:', error.message);
      throw new HttpException('Failed to retrieve payment options', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Initialize payment
  @Post('initialize')
  async initiatePayment(@Body() paymentData: PaymentsDto) {
    try {
      const response = await this.paymentService.initiatePayment(paymentData);
      return {
        statusCode: 200,
        message: 'Payment initialization successful',
        checkoutUrl: response.checkoutUrl, // URL to redirect for payment completion
        tx_ref: paymentData.tx_ref,        // Transaction reference for tracking
      };
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      throw new HttpException('Payment initialization failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Verify payment by charge ID
  @Get('verify/:chargeId')
  async verifyPayment(@Param('chargeId') chargeId: string) {
    try {
      const verificationResult = await this.paymentService.verifyPayment(chargeId);
      return {
        statusCode: 200,
        message: 'Payment verification successful',
        data: verificationResult.data,
      };
    } catch (error) {
      console.error('Error verifying payment:', error.message);
      throw new HttpException('Payment verification failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Handle payment callback from payment provider
  @Post('callback')
  async handlePaymentCallback(@Body() callbackData: any) {
    try {
      const { status, tx_ref, charge_id } = callbackData;

      // Validate essential callback data
      if (!status || !tx_ref || !charge_id) {
        throw new HttpException('Invalid callback data', HttpStatus.BAD_REQUEST);
      }

      // Process callback based on payment status
      if (status === 'success') {
        console.log('Payment successful:', callbackData);
        // Perform necessary logic for successful payment (e.g., update database, notify user)
        return { message: 'Payment processed successfully', status: 'success' };
      } else {
        console.log('Payment failed:', callbackData);
        // Perform necessary logic for failed payment (e.g., log, notify user)
        return { message: 'Payment processing failed', status: 'failed' };
      }
    } catch (error) {
      console.error('Error handling callback:', error.message);
      throw new HttpException('Callback processing failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
