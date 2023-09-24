import "@testing-library/jest-dom";

export type spiesObject = {
  get: jest.Mock<string>;
  retrieve: jest.Mock<string>;
  post: jest.Mock<string>;
  patch: jest.Mock<string>;
  delete: jest.Mock<string>;
  resetAll: () => void;
};

export const spies: spiesObject = {
  get: jest.fn(() => "get"),
  retrieve: jest.fn(() => "retrieve"),
  post: jest.fn(() => "post"),
  patch: jest.fn(() => "patch"),
  delete: jest.fn(() => "delete"),
  resetAll(): void {
    this.get.mockReset();
    this.retrieve.mockReset();
    this.post.mockReset();
    this.patch.mockReset();
    this.delete.mockReset();
  },
};
