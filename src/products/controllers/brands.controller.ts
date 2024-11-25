import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('brands')
export class BrandsController {
  @ApiTags('Products')
  @Get()
  getBrands(): string {
    return `Welcome to brands api`;
  }
}
