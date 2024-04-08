import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column()
  updatedAt: Date;
}
