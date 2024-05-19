import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  picture: string;

  @OneToMany(() => CartEntity, (cartEntity) => cartEntity.product, {
    cascade: true,
  })
  carts: CartEntity[];

  @ManyToMany(() => OrderEntity, (orderEntity) => orderEntity.products, {
    cascade: true,
  })
  orders: OrderEntity[];
}
