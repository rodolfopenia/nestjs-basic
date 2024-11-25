import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('categories')
export class CategoriesController {
  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId:string, @Param('id') id:string){
    return `product ${productId} and ${id}`;
  }
}
