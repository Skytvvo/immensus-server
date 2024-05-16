import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.carts)
  user: UserEntity;
  @ManyToOne(() => ProductEntity, (productEntity) => productEntity.carts)
  product: ProductEntity;
}
