import { RegInput } from '../register-input.dto';

export const mockRegInput = (): RegInput => {
  return {
    firstName: 'test',
    lastName: 'tom',
    email: 'testom@gmail.com',
    phone: '09025652652',
    password: 'test205',
  };
};
