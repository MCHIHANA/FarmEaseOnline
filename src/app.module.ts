import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),

    // TypeORM Configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL, // Reads database URL from .env
      autoLoadEntities: true, // Automatically loads entities
      synchronize: true, // Automatically syncs database schema (disable in production)
      extra: {
        connectTimeout: 30000, // 30 seconds timeout
      },
    }),

    // Import Feature Modules
    ProductModule, // Handles product-related features
  ],
  controllers: [AppController], // Main application controller
  providers: [AppService], // Main application service
})
export class AppModule {}
