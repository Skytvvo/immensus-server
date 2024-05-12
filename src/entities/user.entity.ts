import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartEntity } from './cart.entity';
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
  @OneToMany(() => CartEntity, (cartEntity) => cartEntity.user, {
    cascade: true,
  })
  carts: CartEntity[];
}
