import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Brand } from "../entities/brand.entity";

import { CreateBrandDto, UpdateBrandDto } from "../dtos/brands.dto";

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand) private brandRepo:Repository<Brand>
  ) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne( {
      relations: ['products'],
      where: {id}
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto){
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id:number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({ where: {id}});
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  delete(id:number) {
    return this.brandRepo.delete(id);
  }
}
