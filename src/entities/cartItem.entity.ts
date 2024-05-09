import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
@Entity()
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  user: UserEntity;
  @ManyToOne(() => ProductEntity, (product) => product.cartItems)
  product: ProductEntity;
}
