import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure the app to listen on Render's port and all interfaces
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Ensure it binds to all network interfaces
}
bootstrap();
