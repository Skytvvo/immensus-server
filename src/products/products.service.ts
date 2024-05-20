import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from '../dto/product/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const { id } = await this.productRepository.save({
        ...createProductDto,
        carts: [],
      });
      return id;
    } catch (e) {
      throw e;
    }
  }

  async updateProduct({ id, ...rest }: UpdateProductDto) {
    try {
      await this.productRepository.update(id, rest);
      return id;
    } catch (e) {
      throw e;
    }
  }

  async getProductById(productId: string) {
    try {
      return await this.productRepository.findOneBy({ id: productId });
    } catch (e) {
      throw e;
    }
  }

  async getProducts() {
    return await this.productRepository.find();
  }
}
