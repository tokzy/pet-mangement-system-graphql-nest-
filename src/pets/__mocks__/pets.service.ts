export const PetsService = jest.fn().mockReturnValue({
  CreatePets: jest.fn().mockResolvedValue({
    id: expect.any(Number),
    petName: expect.any(String),
    petColor: expect.any(String),
    userId: expect.any(Number),
  }),
  getAllPets: jest.fn().mockResolvedValue(expect.any(Array)),
  getSinglePet: jest.fn().mockResolvedValue({
    id: expect.any(Number),
    petName: expect.any(String),
    petColor: expect.any(String),
    userId: expect.any(Number),
  }),
  updatePets: jest.fn().mockResolvedValue({
    response: expect.any(String),
  }),
  deletePets: jest.fn().mockResolvedValue({
    response: expect.any(String),
  }),
});
