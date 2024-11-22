import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers(): string {
    return `Welcome to customers api`;
  }
}
