import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';

@Injectable()
export class ProductosService {
  private counterId = 1;
  private products: Product[] = [{
    id: 1,
    name: 'Product',
    description: 'A beautiful product',
    price: 122,
    stock: 1,
    image: 'image.png'
  }];

  findAll() {
    return this.products;
  }

  findOne(id:number) {
    const product = this.products.find(item => item.id === id);
    // Error first Primero se analizan los errores
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto){
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id:number, payload:UpdateProductDto){
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload
      };
      return this.products[index];
    }
    return null;
  }

  delete(id:number) {
    const itemIndex = this.products.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      this.products.splice(itemIndex, 1);
    }
  }
}
