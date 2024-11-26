import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express'; // Import Express

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // CORS Configuration
    const allowedOrigins = [
      'http://localhost:3000', // Local development frontend
      'https://farmeaseonline.onrender.com', // Production frontend
    ];

    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Support for cookies or auth headers
    });

    // Serve static files from the 'uploads' directory
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    // Start the server
    const port = process.env.PORT || 5000;
    await app.listen(port);

    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`🖼️  Static files are served at http://localhost:${port}/uploads`);
  } catch (error) {
    console.error('❌ Error starting the server:', error.message);
    process.exit(1); // Exit with error code
  }
}

bootstrap();
