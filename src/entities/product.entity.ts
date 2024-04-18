import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
