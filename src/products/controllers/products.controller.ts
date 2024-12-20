import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

import { ProductosService } from './../services/productos.service';
import { ParseIntPipe } from './../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(
    private productsService: ProductosService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list of products'})
  getAll(
    //@Res() response: Response,
    @Query('limit') limit = 100, // TS puede saber que tipo de dato es
    @Query('offset') offset:number = 0,
    @Query('brand') brand:string
  ){
    // const { limit, offset } = params; <-- Deconstrucción
    // response.status(404).send({
    //   message: `products: limits => ${limit} offset => ${offset} brand => ${brand}`,
    // });
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter(){
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId:number){
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload:CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() payload:UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id:number){
    this.productsService.delete(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(@Param('id', ParseIntPipe) id:number, @Param('categoryId', ParseIntPipe) categoryId: number){
    this.productsService.removeCategoryByProduct(id, categoryId);
  }

  @Put(':id/category/:categoryId')
  updateCategory(@Param('id', ParseIntPipe) id:number, @Param('categoryId', ParseIntPipe) categoryId: number){
    this.productsService.addCategoryToProduct(id, categoryId);
  }
}
