export const UserService = jest.fn().mockReturnValue({
  getAllUsers: jest.fn().mockResolvedValue(expect.any(Array)),
  UpdateUsers: jest.fn().mockResolvedValue({
    response: expect.any(String),
  }),
  deleteUser: jest.fn().mockResolvedValue({
    response: expect.any(String),
  }),
  getOneUser: jest.fn().mockResolvedValue({
    id: expect.any(Number),
    firstName: expect.any(String),
    phone: expect.any(String),
    email: expect.any(String),
    imagePath: expect.any(String) || null,
  }),
});
