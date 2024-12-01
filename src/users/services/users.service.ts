import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/user.dto';

import { ProductosService } from 'src/products/services/productos.service';
import { CustomersService } from './customers.service';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductosService,
    private customerService: CustomersService,
    private configService: ConfigService,
    @Inject('PG') private clientPg:Client,
    @InjectRepository(User) private userRepo:Repository<User>
  ) {}

  findAll() {
    console.log(this.configService.get('API_KEY'));
    console.log(this.configService.get('DATABASE_NAME'));
    return this.userRepo.find({
      relations:['customer']
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      relations: ['customer'],
      where: {id}
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data)
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({where : {id}})
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    }
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });

  }
}
