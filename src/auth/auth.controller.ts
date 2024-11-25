import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  async register(
    @Body('full_name') full_name: string,
    @Body('farm_name') farm_name: string,
    @Body('location') location: string,
    @Body('email') email: string,
    @Body('contact_details') contact_details: string,
    @Body('password') password: string,
  ): Promise<User> {
    // Pass the data to the service method for registration
    return this.authService.register(full_name, farm_name, location, email, contact_details, password);
  }

  // Login a user
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    // Use the authService to log in and return the JWT token
    return this.authService.login({ email, password });
  }
}
