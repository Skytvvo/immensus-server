import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

export enum ProductState {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

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
  @Column({
    type: 'enum',
    enum: ProductState,
    default: ProductState.ACTIVE,
  })
  state: ProductState;

  @OneToMany(() => CartEntity, (cartEntity) => cartEntity.product, {
    cascade: true,
  })
  carts: CartEntity[];

  @ManyToMany(() => OrderEntity, (orderEntity) => orderEntity.products, {
    cascade: true,
  })
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.products)
  creator: UserEntity;
}
