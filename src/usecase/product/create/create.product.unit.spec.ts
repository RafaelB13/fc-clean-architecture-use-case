import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("Shoud create a product", async () => {
    const productRepository = MockRepository();
    const productRepositoryUseCase = new CreateProductUseCase(productRepository);

    const output = await productRepositoryUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it("Should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productRepositoryUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productRepositoryUseCase.execute(input)).rejects.toThrow("Name is required")
  })
});