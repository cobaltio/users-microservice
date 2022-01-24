import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './schemas/create-user.dto';
import { User } from './schemas/user.schema';
import { UserEntity } from './schemas/user.entity';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern({ cmd: 'create-user' })
  async create(user: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.createUser(user));
  }

  @MessagePattern({ cmd: 'find-user' })
  async find(username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @MessagePattern({ cmd: 'get-nonce' })
  async getNonce(public_addr: string) {
    return this.usersService.getNonce(public_addr);
  }

  @MessagePattern({ cmd: 'update-nonce' })
  async updateNonce(public_addr: string) {
    this.usersService.updateNonce(public_addr);
  }
}
