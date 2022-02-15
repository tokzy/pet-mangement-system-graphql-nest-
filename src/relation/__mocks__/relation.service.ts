export const RelationService = jest.fn().mockReturnValue({
 pets: jest.fn().mockResolvedValue(expect.any(Array)),  
});
