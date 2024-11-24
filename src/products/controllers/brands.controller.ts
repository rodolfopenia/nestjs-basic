import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands(): string {
    return `Welcome to brands api`;
  }
}
