import { mockLoginResponse } from '../dto/stub/login-response.mock.dto';
import { mockRegResponse } from '../dto/stub/register-response.mock.dto';
import { mockUserInput } from '../dto/stub/user-input.dto';
import { User } from '../entities/user.entity';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(mockLoginResponse()),
  Register: jest.fn().mockResolvedValue(mockRegResponse()),
  hashPassword: jest.fn().mockResolvedValue(expect.any(String)),
  validateUser: jest.fn().mockResolvedValue(mockUserInput()),
  checkIfUserExists: jest.fn().mockResolvedValue(true||false),


});
