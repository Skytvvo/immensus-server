import { Controller, Get, UseGuards, Request, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from '../dto/user/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  async getAll(@Request() req) {
    return await this.usersService.getAll(req.user.id);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return await this.usersService.updateUser(updateUserDto, req.user.id);
  }
}
