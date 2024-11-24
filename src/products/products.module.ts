import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductosService } from './services/productos.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductosService],
  exports: [ProductosService]
})
export class ProductsModule {}
