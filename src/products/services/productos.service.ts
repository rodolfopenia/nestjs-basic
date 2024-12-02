import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Product } from './../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Product) private productRepo:Repository<Product>,
    @InjectRepository(Category) private categoryRepo:Repository<Category>,
    @InjectRepository(Brand) private brandRepo:Repository<Brand>,
  ){}

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id:number) {
    const product = await this.productRepo.findOne({
      //select: {'name': true},
      relations: { 
        'brand' : true,
        'categories': true,
       },
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
      const brand = await this.brandRepo.findOne({ where: {id : data.brandId}});
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
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
      const brand = await this.brandRepo.findOne({ where : {id : changes.brandId}});
      product.brand = brand
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      relations: { 
        'categories': true,
      }
    });
    const category = await this.categoryRepo.findOne({ where : { id: categoryId}});
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne( { 
      relations: { 'categories': true },
      where : { id: productId}
    });
    product.categories = product.categories.filter((item) => item.id !== categoryId);
    return this.productRepo.save(product);
  }

  delete(id:number) {
    return this.productRepo.delete(id);
  }
}
