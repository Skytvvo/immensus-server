import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from '../dto/cartItem/create-cartItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ProductEntity } from '../entities/product.entity';
import { UpdateCartItemDto } from '../dto/cartItem/update-cartItem.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartEntityRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createCart(
    { productId, quantity }: CreateCartItemDto,
    currentUserId: string,
  ) {
    if (quantity < 1) throw new BadRequestException();

    const cartUser = await this.userRepository.findOneBy({
      id: currentUserId,
    });
    const product = await this.productRepository.findOneBy({ id: productId });

    const existingCart = await this.cartEntityRepository.findOneBy({
      user: cartUser,
      product: product,
    });

    if (existingCart) throw new BadRequestException();

    await this.cartEntityRepository.save({
      quantity,
      user: cartUser,
      product,
    });
  }

  async updateCart({ id, quantity }: UpdateCartItemDto) {
    if (quantity < 1) throw new BadRequestException();

    const existingCart = await this.cartEntityRepository.findOneBy({
      id,
    });

    existingCart.quantity = quantity;
    await this.cartEntityRepository.update(existingCart.id, { quantity });
  }

  async getCart(currentUserId: string) {
    const currentUser = await this.userRepository.findOneBy({
      id: currentUserId,
    });
    return await this.cartEntityRepository.find({
      relations: {
        product: {},
      },
      where: {
        user: currentUser,
      },
    });
  }

  async emptyCart(cartId: string) {
    await this.cartEntityRepository.delete({
      id: cartId,
    });
  }
}
