import { Injectable } from '@nestjs/common';
import { CreateProduct } from '../dto/product/create-product';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(createProductDto: CreateProduct) {
    const { picture: _, ...restProps }: CreateProduct = createProductDto;
    try {
      const { id } = await this.productRepository.save({
        ...restProps,
        // todo: add AWS
        picture:
          'https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/nike-joyride.jpg',
      });
      return id;
    } catch (e) {
      throw e;
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      return product;
    } catch (e) {
      throw e;
    }
  }
}
