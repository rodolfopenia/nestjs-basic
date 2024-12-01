import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { EmbeddedMetadata } from "typeorm/metadata/EmbeddedMetadata";

@Entity({ name: 'customers'})
export class Customer {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'varchar', length: 255})
  lastName: string;

  @Column({ type: 'varchar', length: 255})
  phone: string;

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

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
