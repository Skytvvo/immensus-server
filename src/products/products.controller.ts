import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { CreateProduct } from '../dto/product/create-product';
import { Public } from '../auth/public-strategy';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  //todo: fix roles
  @Public()
  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProduct,
    @Res() response: Response,
  ) {
    const createdProductId =
      await this.productsService.createProduct(createProductDto);
    response.send({ createdProductId });
  }

  @HttpCode(HttpStatus.OK)
  //todo: fix roles
  @Public()
  @Get(':id')
  async getProductById(@Param('id') id, @Res() response: Response) {
    const product = await this.productsService.getProductById(id);
    response.send(product);
  }
}
