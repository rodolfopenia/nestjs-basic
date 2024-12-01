import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';

import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';

import { ProductsModule } from 'src/products/products.module';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule {}
