import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '../dto/order/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { In, Repository } from 'typeorm';
import { OrderEntity, OrderStatusEnum } from '../entities/order.entity';
import { UserEntity, UserRoles } from '../entities/user.entity';
import { UpdateControlledOrderDto } from '../dto/order/update-controlled-order.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
    private configService: ConfigService,
    @InjectRepository(CartEntity)
    private cartEntityRepository: Repository<CartEntity>,
    @InjectRepository(OrderEntity)
    private orderEntityRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    this.stripe = new Stripe(this.apiKey);
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async createSession(data: CreateOrderDto & { userId: string }) {
    const cartItems = await this.cartEntityRepository.find({
      relations: ['product'],
      where: {
        id: In(data.cartItemIds),
      },
    });

    const owner = await this.userRepository.findOneBy({
      id: data.userId,
    });

    const line_items = cartItems.map(({ product: { price }, quantity }) => ({
      quantity,
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'test',
        },
        unit_amount: price,
      },
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${this.configService.get<string>('CLIENT_DOMAIN')}`,
      cancel_url: `${this.configService.get<string>('CLIENT_DOMAIN')}`,
    });

    await this.orderEntityRepository.save({
      sessionId: session.id,
      address: data.address,
      user: owner,
      status: OrderStatusEnum.PROCESSING,
      products: cartItems.map(({ product }) => product),
    });

    await this.cartEntityRepository.remove(cartItems);

    return session.url;
  }

  async getOrders(userId: string) {
    const owner = await this.userRepository.findOneBy({ id: userId });
    return await this.orderEntityRepository.find({
      where: {
        user: owner,
      },
      relations: ['products'],
    });
  }

  async getControlledProducts(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (user.role === UserRoles.USER) throw new ForbiddenException();

    const where =
      user.role === UserRoles.ADMIN
        ? {}
        : {
            user,
          };

    return await this.orderEntityRepository.find({
      relations: ['products', 'user'],
      where,
    });
  }

  async updateControlledProducts({
    id,
    status,
    address,
  }: UpdateControlledOrderDto) {
    console.log(id, status, address)
    return this.orderEntityRepository.update(id, { status, address });
  }
}
