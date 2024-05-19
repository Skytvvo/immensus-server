import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

export enum OrderStatusEnum {
  PROCESSING = 'PROCESSING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  sessionId: string;
  @Column()
  address: string;
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PROCESSING,
  })
  status: OrderStatusEnum;

  @ManyToMany(() => ProductEntity, (productEntity) => productEntity.orders)
  @JoinTable()
  products: ProductEntity[];

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.orders)
  user: UserEntity;
}
