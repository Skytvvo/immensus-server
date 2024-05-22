import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDto } from '../dto/order/create-order.dto';

@Controller('order')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @UseGuards(AuthGuard)
  @Get('products')
  async getProducts() {
    return await this.stripeService.getProducts();
  }

  @UseGuards(AuthGuard)
  @Get('customers')
  async getCustomers() {
    return await this.stripeService.getCustomers();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.stripeService.createSession({
      ...createOrderDto,
      userId: req.user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getOrders(@Request() req) {
    return await this.stripeService.getOrders(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('controlled')
  async getControlledProducts(@Request() req) {
    return await this.stripeService.getControlledProducts(req.user.id);
  }
}
