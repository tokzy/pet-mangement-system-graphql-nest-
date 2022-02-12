import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/logininput.dto';
import { LoginToken } from './dto/logintoken.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';
import { RegInput } from './dto/register-input.dto';
import * as fs from 'fs/promises';
import * as randstring from 'randomstring';
import { join } from 'path';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtservice: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async login(Logininput: LoginInput): Promise<LoginToken> {
    const { phone, password } = Logininput;
    return await this.validateUser(phone, password).then(async (result) => {
      if (result) {
        return await this.jwtservice.signAsync({ result }).then((token) => {
          return { accessToken: token };
        });
      } else {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }
    });
  }

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { phone: username },
      {
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'imagePath',
          'password',
          'phone',
        ],
      },
    );
    if (user) {
      return await bcrypt.compare(password, user.password).then((value) => {
        if (value) {
          const { password, ...result } = user;
          return result;
        } else {
          return null;
        }
      });
    }
    return null;
  }

  public async checkIfUserExists(user: RegInput): Promise<boolean> {
    const { email } = user;
    return await this.userRepository.count({ email: email }).then((count) => {
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  private async addProfileImage(imageString: string): Promise<string> {
    const directory = process.cwd() + '/public/images';
    let newPath: string;
    let imageName: string;
    let finalPath: string;

    if (!isEmpty(imageString)) {
      const buffer = Buffer.from(imageString, 'base64');
      imageName = randstring.generate(7) + '.jpeg';
      newPath = join(directory, imageName);
      await fs.writeFile(newPath, buffer);
      finalPath = 'images/' + imageName;
    } else {
      finalPath = imageString;
    }

    return finalPath;
  }

  public async Register(userRegInput: RegInput): Promise<any> {
    const { firstName, lastName, email, phone, imagePath, password } =
      userRegInput;

    return await this.checkIfUserExists(userRegInput).then(async (check) => {
      if (check == true) {
        return new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
      } else {
        return await this.hashPassword(password).then(async (password) => {
          return await this.addProfileImage(imagePath).then(
            async (imagePath) => {
              return await this.userRepository
                .save({
                  firstName,
                  lastName,
                  phone,
                  email,
                  password,
                  imagePath,
                })
                .then((newUser) => {
                  const { password, ...data } = newUser;
                  data.imagePath = process.env.baseUrl + '' + newUser.imagePath;
                  return data;
                });
            },
          );
        });
      }
    });
  }
}
