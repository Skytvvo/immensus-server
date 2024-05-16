import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCartItemDto } from '../dto/cartItem/create-cartItem.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from '../dto/cartItem/update-cartItem.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('create')
  async createCart(
    @Body() createCartItemDto: CreateCartItemDto,
    @Request() req,
  ) {
    return await this.cartService.createCart(createCartItemDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('update')
  async updateCart(@Body() updateCartItemDto: UpdateCartItemDto) {
    return await this.cartService.updateCart(updateCartItemDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get')
  async getCart(@Request() req) {
    return await this.cartService.getCart(req.user.id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('empty/:id')
  async emptyCart(@Param('id') id: string) {
    return await this.cartService.emptyCart(id);
  }
}
