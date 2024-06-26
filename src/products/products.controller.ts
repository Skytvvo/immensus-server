import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { Public } from '../auth/public-strategy';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProductDto } from '../dto/product/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() response: Response,
    @Request() req,
  ) {
    const createdProductId = await this.productsService.createProduct(
      createProductDto,
      req.user.id,
    );
    response.send({ createdProductId });
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
  ) {
    const id = await this.productsService.updateProduct(updateProductDto);
    response.send({ id });
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

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  async getAll(@Request() req) {
    return await this.productsService.getAll(req.user.id);
  }
}
