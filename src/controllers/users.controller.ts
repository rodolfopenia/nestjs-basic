import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getOrders(): string {
    return `Welcome to orders api`;
  }
}
