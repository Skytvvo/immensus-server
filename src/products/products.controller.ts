import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { CreateProduct } from '../dto/product/create-product';
import { Public } from '../auth/public-strategy';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() createProductDto: CreateProduct,
    @Res() response: Response,
  ) {
    console.log(createProductDto);
    const createdProductId =
      await this.productsService.createProduct(createProductDto);
    response.send({ createdProductId });
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  async getProductById(@Query('id') id, @Res() response: Response) {
    const product = await this.productsService.getProductById(id);
    response.send(product);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('feed')
  async getProducts(@Res() response: Response) {
    const products = await this.productsService.getProducts();
    response.send(products);
  }
}
