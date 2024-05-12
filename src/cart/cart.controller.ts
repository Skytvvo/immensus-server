import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCartItemDto } from '../dto/cartItem/create-cartItem.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('add')
  async addToCart(
    @Body() createCartItemDto: CreateCartItemDto,
    @Request() req,
  ) {
    return await this.cartService.addToCart(createCartItemDto, req.user.id);
  }
}
