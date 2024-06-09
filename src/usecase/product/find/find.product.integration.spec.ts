import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product", 231)
    await productRepository.create(product);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "Product",
      price: 231
    };

    const result = await productUseCase.execute(input);

    expect(result).toEqual(output);

  })
});