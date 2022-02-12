import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find().then((users) => {
      const data = [];
      users.forEach((user) => {
        const { imagePath } = user;
        if (!isEmpty(imagePath)) {
          user.imagePath = process.env.baseUrl + '' + imagePath;
        }
        data.push(user);
      });
      return data;
    });
  }
}
