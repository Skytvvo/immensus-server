import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserEntity, UserRoles } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/user/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findOneBy(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
      updated: new Date(),
      carts: [],
    });
  }

  async getAll(id: string) {
    const user = this.userRepository.findOneBy({ id, role: UserRoles.ADMIN });

    if (!user) throw new ForbiddenException();

    return await this.userRepository.find();
  }

  async updateUser(
    { id: updatingUserId, ...updateUserDto }: UpdateUserDto,
    id: string,
  ) {
    const updater = await this.userRepository.findOneBy({ id });
    if (!updater || updater?.role !== UserRoles.ADMIN)
      throw new ForbiddenException();

    await this.userRepository.update(updatingUserId, updateUserDto);
  }
}
