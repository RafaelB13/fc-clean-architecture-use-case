import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 100)

const input = {
    id: product.id,
    name: "Product Updated",
    price: 1000
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    };
}

describe("Unit test for product update use case", () => {
it("Should return product updated", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockReturnValue(Promise.resolve(product));
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);
    expect(output).toEqual(input);
    });

});