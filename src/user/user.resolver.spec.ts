import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/auth/entities/user.entity';
import { deleteResponse } from './dto/user-delete-response.dto';
import { UpdateResponse } from './dto/user-update-response';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

jest.mock('./user.service');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userservice: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userservice = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should define user service', () => {
    expect(userservice).toBeDefined();
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      let getusers: User[];
      beforeEach(async () => {
        getusers = await userservice.getAllUsers();
      });

      test('it should not contain any args', () => {
        expect(userservice.getAllUsers).not.toBeCalledWith(expect.anything());
      });

      test('it should return array of users', () => {
        expect(getusers).toEqual(expect.any(Array));
      });
    });
  });

  describe('UpdateUsers', () => {
    describe('when UpdateUsers is called', () => {
      let updateuser: UpdateResponse;
      beforeEach(async () => {
        updateuser = await userservice.UpdateUsers({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
        });
      });

      test('it should be called with', () => {
        expect(userservice.UpdateUsers).toBeCalledWith({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
        });
      });

      test('it should return update response', () => {
        expect(updateuser).toEqual({
          response: expect.any(String),
        });
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let deleteuser: deleteResponse;
      beforeEach(async () => {
        deleteuser = await userservice.deleteUser(expect.any(Number));
      });

      test('it should be called with', () => {
        expect(userservice.deleteUser).toBeCalledWith(expect.any(Number));
      });

      test('it should return delete response', () => {
        expect(deleteuser).toEqual({
          response: expect.any(String),
        });
      });
    });
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let getuser: User;
      beforeEach(async () => {
        getuser = await userservice.getOneUser(expect.any(Number));
      });

      test('it should be called with', () => {
        expect(userservice.getOneUser).toBeCalledWith(expect.any(Number));
      });

      test('it should return a user object', () => {
        expect(getuser).toEqual({
          id: expect.any(Number),
          firstName: expect.any(String),
          phone: expect.any(String),
          email: expect.any(String),
          imagePath: expect.any(String) || null,
        });
      });
    });
  });
  
});
