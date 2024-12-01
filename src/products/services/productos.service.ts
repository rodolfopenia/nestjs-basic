import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from './brands.service';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';

@Injectable()
export class ProductosService {

  constructor(
    private brandsService:BrandsService,
    @InjectRepository(Product) private productRepo:Repository<Product>
  ){}

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id:number) {
    const product = await this.productRepo.findOne({
      // select: {'product.name': true},
      relations: { 'brand' : true, },
      where: {id}
    });
    // const product = await this.productRepo.createQueryBuilder('p').where('p.id = :id', {id}).select(['p.name', 'p.brand']);
    // Error first Primero se analizan los errores
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto){
    const newProduct = this.productRepo.create(data);
    // Create crea una instancia
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
    // Save guarda en la tabla
  }

  async update(id:number, changes:UpdateProductDto){
    const product = await this.productRepo.findOne({ where: {id}});
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  delete(id:number) {
    return this.productRepo.delete(id);
  }
}
