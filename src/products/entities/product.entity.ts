import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, JoinTable, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({name: 'products'})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, nullable: true})
  name: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int'})
  stock: number;

  @Column({type: 'varchar', length: 255})
  image: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
