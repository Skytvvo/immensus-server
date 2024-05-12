import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { UserEntity } from '../entities/user.entity';
import { ProductEntity } from '../entities/product.entity';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [TypeOrmModule.forFeature([CartEntity, UserEntity, ProductEntity])],
})
export class CartModule {}
