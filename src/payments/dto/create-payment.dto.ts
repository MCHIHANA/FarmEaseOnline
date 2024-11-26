// src/payments/dto/create-payment.dto.ts
import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PaymentsDto {
  @IsNotEmpty()
  @IsString()
  name: string;  // Product name

  @IsNotEmpty()
  @IsString()
  mobile: string;  // Customer's mobile number

  @IsNotEmpty()
  @IsString()
  operator: string;  // Payment operator (e.g., 'airtel' or 'tnm')

  @IsNotEmpty()
  @IsNumber()
  amount: number;  // Total amount to be paid

  @IsOptional()
  @IsString()
  tx_ref?: string;  // Unique transaction reference
}
