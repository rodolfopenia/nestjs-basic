import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Controller('brands')
export class BrandsController {

  constructor(
    private brandService:BrandsService
  ) {}

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() payload:CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() payload: UpdateBrandDto){
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id:number) {
    return this.brandService.delete(id);
  }
}
