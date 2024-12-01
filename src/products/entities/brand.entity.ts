import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { Product } from "./product.entity";

@Entity({ name: 'brands'})
export class Brand {
  @PrimaryColumn()
  id:number;
  @Column()
  name: string;
  @Column()
  image: string;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
