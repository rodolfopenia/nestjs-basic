import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Res() response: Response,
    @Query('limit') limit = 100, // TS puede saber que tipo de dato es
    @Query('offset') offset:number = 0,
    @Query('brand') brand:string
  ){
    // const { limit, offset } = params; <-- Deconstrucción
    response.status(404).send({
      message: `products: limits => ${limit} offset => ${offset} brand => ${brand}`,
    });
  }

  @Get('filter')
  getProductFilter(){
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId:string){
    return {
      message: `product ${productId}`
    }
  }

  @Post()
  create(@Body() payload:any) {
    return {
      message: 'Acción de crear',
      payload,
    }
  }

  @Put(':id')
  update(@Param('id') id:number, @Body() payload:any) {
    return {
      id,
      payload
    }
  }

  @Delete(':id')
  delete(@Param('id') id:number){
    return {
      message: `Delete was succefully with id: ${id}`
    }
  }
}
