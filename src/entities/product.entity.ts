import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from './cart.entity';

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
}
