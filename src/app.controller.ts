import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource, // Inject the DataSource
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db') // Ensure this is the route
  async testDatabaseConnection(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1'); // Simple database query
      return 'Database connection is successful!';
    } catch (error) {
      console.error('Database connection test failed:', error);
      return 'Failed to connect to the database. Check the logs for details.';
    }
  }
}
