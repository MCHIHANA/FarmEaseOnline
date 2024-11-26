import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    full_name: string,
    farm_name: string,
    location: string,
    email: string,
    contact_details: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      full_name,
      farm_name,
      location,
      email,
      contact_details,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: { email: string; password: string }): Promise<{ accessToken: string }> {
    const existingUser = await this.validateUser(user.email, user.password);
    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: existingUser.email, sub: existingUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
