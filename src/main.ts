import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'https://your-frontend-domain.com'], // Add your frontend's domain(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable this if cookies or auth headers are required
  });

  // Configure the app to listen on Render's port and all interfaces
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Ensure it binds to all network interfaces
}
bootstrap();
