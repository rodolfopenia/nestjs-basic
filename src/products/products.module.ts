import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';

import { ProductosService } from './services/productos.service';
import { BrandsService } from './services/brands.service';

import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Product, Brand, Category]) ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductosService, BrandsService],
  exports: [ProductosService]
})
export class ProductsModule {}
