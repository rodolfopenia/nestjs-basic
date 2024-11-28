import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';

import { ProductosService } from './services/productos.service';

import { Product } from './entities/product.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Product]) ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductosService],
  exports: [ProductosService]
})
export class ProductsModule {}
