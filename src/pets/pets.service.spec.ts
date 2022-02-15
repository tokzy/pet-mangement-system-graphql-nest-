import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entitiy';
import { PetsService } from './pets.service';

jest.mock('./pets.service');

describe('PetsService', () => {
  let service: PetsService;
  let petRepository: Repository<Pet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        {
          provide: getRepositoryToken(Pet),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
    petRepository = module.get<Repository<Pet>>(getRepositoryToken(Pet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('petRepository should be injected', () => {
    expect(petRepository).toBeDefined();
  });

  describe('checkIfPetExists', () => {
    describe('when checkIfPetExists is called', () => {
      let checkpet: boolean;
      beforeEach(async () => {
        checkpet = await service.checkIfPetExists(expect.any(String));
      });

      it('should be called with ', () => {
        expect(service.checkIfPetExists).toBeCalledWith(expect.any(String));
      });
      it('should return boolean', () => {
        expect(checkpet).toEqual(true || false);
      });
    });
  });

  describe('getAllPetsPerUser', () => {
    describe('when getAllPetsPerUser is called', () => {
      let getpets: Pet[];
      beforeEach(async () => {
        getpets = await service.getAllPetsPerUser(expect.any(Number));
      });

      it('should be called with user Id', () => {
        expect(service.getAllPetsPerUser).toBeCalledWith(expect.any(Number));
      });
      it('should return boolean', () => {
        expect(getpets).toEqual(expect.any(Array));
      });
    });
  });
});
