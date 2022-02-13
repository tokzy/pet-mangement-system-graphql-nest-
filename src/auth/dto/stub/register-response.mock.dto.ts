import { User } from 'src/auth/entities/user.entity';

export const mockRegResponse = (): User => {
  return {
    id: 35,
    firstName: 'test',
    lastName: 'tom',
    email: 'testom@gmail.com',
    phone: '09025652652',
    password: 'test205',
  };
};
