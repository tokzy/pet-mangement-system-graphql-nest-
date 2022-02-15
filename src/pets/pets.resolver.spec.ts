import { Test, TestingModule } from '@nestjs/testing';
import { deletePetResponse } from './dto/delete-pet-response.dto';
import { updatePetResponse } from './dto/update-pet-response.dto';
import { Pet } from './entities/pet.entitiy';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

jest.mock('./pets.service');

describe('PetsResolver', () => {
  let resolver: PetsResolver;
  let petservice: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsResolver, PetsService],
    }).compile();

    resolver = module.get<PetsResolver>(PetsResolver);
    petservice = module.get<PetsService>(PetsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('petservice should be injected', () => {
    expect(petservice).toBeDefined();
  });

  describe('CreatePet', () => {
    describe('when CreatePet is called', () => {
      let create: Pet;

      beforeEach(async () => {
        create = await petservice.CreatePets({
          petName: expect.any(String),
          petColor: expect.any(String),
          userId: expect.any(Number),
        });
      });

      test('it should be called with', () => {
        expect(petservice.CreatePets).toBeCalledWith({
          petName: expect.any(String),
          petColor: expect.any(String),
          userId: expect.any(Number),
        });
      });

      test('it should return created pets', () => {
        expect(create).toEqual({
          id: expect.any(Number),
          petName: expect.any(String),
          petColor: expect.any(String),
          userId: expect.any(Number),
        });
      });
    });
  });

  describe('getAllPets', () => {
    describe('when getAllPets is called', () => {
      let getAllPets: Pet[];

      beforeEach(async () => {
        getAllPets = await petservice.getAllPets();
      });

      test('it should return array of pets', () => {
        expect(getAllPets).toEqual(expect.any(Array));
      });
    });
  });

  describe('getSinglePet', () => {
    describe('when getSinglePet is called', () => {
      let getSinglePet: Pet;

      beforeEach(async () => {
        getSinglePet = await petservice.getSinglePet(expect.any(Number));
      });

      test('it should be called with petId', () => {
        expect(petservice.getSinglePet).toBeCalledWith(expect.any(Number));
      });

      test('it should return a pet object', () => {
        expect(getSinglePet).toEqual({
          id: expect.any(Number),
          petName: expect.any(String),
          petColor: expect.any(String),
          userId: expect.any(Number),
        });
      });
    });
  });

  describe('updatePets', () => {
    describe('when updatePets is called', () => {
      let updatePets: updatePetResponse;
      beforeEach(async () => {
        updatePets = await petservice.updatePets({
          id: expect.any(Number),
          userId: expect.any(Number),
          petName: expect.any(String),
          petColor: expect.any(String),
        });
      });

      test('it should be called with', () => {
        expect(petservice.updatePets).toBeCalledWith({
          id: expect.any(Number),
          userId: expect.any(Number),
          petName: expect.any(String),
          petColor: expect.any(String),
        });
      });

      test('it should return response', () => {
        expect(updatePets).toEqual({
          response: expect.any(String),
        });
      });
    });
  });

  describe('deletePets', () => {
    describe('when deletePets is called', () => {
      let deletePets: deletePetResponse;
      beforeEach(async () => {
        deletePets = await petservice.deletePets(expect.any(Number));
      });

      test('it should be called with', () => {
        expect(petservice.deletePets).toBeCalledWith(expect.any(Number));
      });

      test('it should return response', () => {
        expect(deletePets).toEqual({
          response: expect.any(String),
        });
      });
    });
  });
});
