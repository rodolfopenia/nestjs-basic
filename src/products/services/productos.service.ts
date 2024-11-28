import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Product) private productRepo:Repository<Product>
  ){}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id:number) {
    const product = await this.productRepo.findOneBy({id});
    // Error first Primero se analizan los errores
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto){
    // Way 1
    // const newProduct = new Product();
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    const newProduct = this.productRepo.create(data);
    // Create crea una instancia
    return this.productRepo.save(newProduct);
    // Save guarda en la tabla
  }

  async update(id:number, changes:UpdateProductDto){
    const product = await this.productRepo.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  delete(id:number) {
    return this.productRepo.delete(id);
  }
}
