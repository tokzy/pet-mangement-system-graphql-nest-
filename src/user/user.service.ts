import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { UserUpdateInput } from './dto/user-update-input.dto';
import { UpdateResponse } from './dto/user-update-response';
import { deleteResponse } from './dto/user-delete-response.dto';
import { UserDeleteInput } from './dto/user-delete-input.dto';

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

  public async UpdateUsers(
    userInput: UserUpdateInput,
  ): Promise<UpdateResponse> {
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
        } else {
          throw new HttpException(
            'data not updated',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
  }

  public async deleteUser(userInput: UserDeleteInput): Promise<deleteResponse> {
    const { id } = userInput;
    return this.usersRepository.delete(id).then((result) => {
      if (result) {
        return { response: 'success' };
      } else {
        throw new HttpException(
          'data not deleted',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }
}
