import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PaymentsDto } from './dto/create-payment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private generateUniqueTransactionReference(): string {
    return uuidv4();
  }

  async initiatePayment(paymentData: PaymentsDto): Promise<any> {
    paymentData.tx_ref = this.generateUniqueTransactionReference();
    const apiKey = this.configService.get<string>('PAYMENT_API_KEY');
    if (!apiKey) {
      throw new HttpException('Payment API key is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const headers = {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.paychangu.com/payment',
          {
            ...paymentData,
            callback_url: 'http://localhost/Verification/', // Set this to your app's callback URL
            return_url: 'https://localhost:3000', // Redirect URL on success
            currency: 'MWK',
            amount: paymentData.amount,
          },
          { headers },
        ),
      );

      if (response.data.status === 'success') {
        return {
          statusCode: 200,
          message: 'Payment initiated successfully. Redirecting to PayChangu checkout...',
          checkoutUrl: response.data.data.checkout_url, // Use this URL for redirection to PayChangu
        };
      } else {
        throw new HttpException(
          response.data.message || 'Payment initiation failed.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Error processing payment:', error.message);
      throw new HttpException(
        'An error occurred while processing payment.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyPayment(chargeId: string): Promise<any> {
    const apiKey = this.configService.get<string>('PAYMENT_API_KEY');
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://api.paychangu.com/verify-payment/${chargeId}`, { headers })
      );

      if (response.data.status === 'success') {
        return {
          statusCode: 200,
          message: 'Payment verified successfully.',
          data: response.data.data,
        };
      } else {
        throw new HttpException(
          response.data.message || 'Payment verification failed.',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Error verifying payment:', error.message);
      throw new HttpException(
        'An error occurred while verifying payment.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getPaymentOptions() {
    return {
      statusCode: 200,
      message: 'Payment options retrieved successfully.',
      data: [
        { operator: 'airtel', displayName: 'Airtel Money' },
        { operator: 'tnm', displayName: 'Tnm Mpamba' },
      ],
    };
  }
}
