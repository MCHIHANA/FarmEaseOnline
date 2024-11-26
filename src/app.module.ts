import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static'; // Import the ServeStaticModule
import { join } from 'path'; // Import 'path' for resolving paths
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
      synchronize: true, // Use only for development, disable in production
      extra: {
        connectTimeout: 30000, // 30 seconds timeout for database connections
      },
    }),

    // Serve static files from the 'uploads' directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // Prefix for accessing files in the browser
    }),

    // Import your feature modules
    ProductsModule,
    UploadModule,
    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
