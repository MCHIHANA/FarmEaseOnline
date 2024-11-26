import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/product.module';
import { UploadModule } from './products/upload.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payments/payments.module';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure TypeORM with MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true, // Automatically load entities from modules
      synchronize: true, // Use only for development, disables in production
      extra: {
        connectTimeout: 30000, // 30 seconds timeout for database connections
      },
    }),

    // Import your feature modules
    ProductsModule,
    UploadModule,
    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
