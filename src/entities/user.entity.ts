import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  createdAt: Date;
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @OneToMany(() => CartEntity, (cartEntity) => cartEntity.user, {
    cascade: true,
  })
  carts: CartEntity[];

  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.user, {
    cascade: true,
  })
  orders: OrderEntity[];

  @OneToMany(() => ProductEntity, (product) => product.creator)
  products: ProductEntity[];
}
