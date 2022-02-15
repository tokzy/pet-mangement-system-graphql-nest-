export const RelationService = jest.fn().mockReturnValue({
  pets: jest.fn().mockResolvedValue(expect.any(Array)),
  getOneUser: jest.fn().mockResolvedValue({
    id: expect.any(Number),
    firstName: expect.any(String),
    lastName: expect.any(String),
    phone: expect.any(String),
    email: expect.any(String),
    imagePath: expect.any(String) || null,
  }),
});
