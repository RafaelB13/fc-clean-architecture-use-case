import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case integration", () => {
  let sequelize: Sequelize;

  beforeEach(async()=> {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async()=> {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Product 1", 100);

    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product 1",
      price: 100
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  })
})