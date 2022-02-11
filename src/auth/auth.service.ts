import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/logininput.dto';
import { LoginToken } from './dto/logintoken.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtservice: JwtService,
  ) {}

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

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find().then((users) => { 
     let data = []; 
     users.forEach((user) => {
     const {imagePath} = user;
     if(!isEmpty(imagePath)){
     user.imagePath = process.env.baseUrl+""+imagePath;     
     }
     data.push(user);
     })
     return data; 
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
    if (user && user.password == password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
