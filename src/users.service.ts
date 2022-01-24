import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './schemas/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  // TODO: Add appropriate promise resolve/reject
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  static async generateNonce(): Promise<string> {
    const buff = crypto.randomBytes(4);
    const hex = buff.toString('hex');
    return parseInt(hex, 16).toString();
  }

  async createUser(createUserDto: CreateUserDto) {
    const { public_address } = createUserDto;

    const user = await this.userModel.findOne({
      $or: [{ public_address: public_address }],
    });

    if (!user) {
      createUserDto.nonce = await UsersService.generateNonce();

      const createdUser = new this.userModel(createUserDto);
      createdUser.save(function (err) {
        if (err) console.log(err);
        console.log('Save Successful');
      });
      return createdUser;
    }
    return user;
  }

  async getNonce(public_addr: string): Promise<string> {
    const user: User = await this.createUser({
      public_address: public_addr,
    } as CreateUserDto);
    return user.nonce;
  }

  async updateNonce(public_addr: string) {
    const user = await this.findOne(public_addr);
    user.nonce = await UsersService.generateNonce();
    await user.save();
  }

  async findOne(public_addr: string) {
    return this.userModel.findOne({ public_address: public_addr });
  }
}
