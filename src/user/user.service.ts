import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { UserUpdateInput } from './dto/user-update-input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find().then((users) => {
      let data = [];
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

  public async UpdateUsers(userInput: UserUpdateInput): Promise<any> {
    const { id, email, firstName, lastName } = userInput;
    return await this.usersRepository
      .update(id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then((result) => {
        if (result) {
          return { response: 'success' };
        }
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
