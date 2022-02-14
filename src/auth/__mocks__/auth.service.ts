import { mockLoginResponse } from '../dto/stub/login-response.mock.dto';
import { mockRegResponse } from '../dto/stub/register-response.mock.dto';

export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(mockLoginResponse()),
  Register: jest.fn().mockResolvedValue(mockRegResponse()),
  hashPassword: jest.fn().mockResolvedValue(expect.any(String)),
});
