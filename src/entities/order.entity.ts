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
  CANCELED = 'CANCELED',
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
    default: 0,
  })
  cost: number;
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
