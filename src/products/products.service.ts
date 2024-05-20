import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity, ProductState } from '../entities/product.entity';
import { Not, Repository } from 'typeorm';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { UserEntity, UserRoles } from '../entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto, creatorId) {
    try {
      const creator = await this.userRepository.findOneBy({ id: creatorId });
      const { id } = await this.productRepository.save({
        ...createProductDto,
        carts: [],
        creator,
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
    return await this.productRepository.find({
      where: {
        state: Not(ProductState.DELETED),
      },
    });
  }

  async deleteProduct(id: string) {
    await this.productRepository.update(id, { state: ProductState.DELETED });
  }

  async getAll(id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    switch (user?.role) {
      case UserRoles.ADMIN:
        return await this.productRepository.find({
          relations: ['creator', 'orders'],
        });
      case UserRoles.SELLER:
        return await this.productRepository.find({
          where: {
            creator: user,
          },
          relations: ['creator', 'orders'],
        });
      default:
        throw new ForbiddenException();
    }
  }
}
