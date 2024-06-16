import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case integration", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });


        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product1 = new Product("1", "Product 1", 23);
        const product2 = new Product("2", "Product 2", 24);
        const product3 = new Product("3", "Product 3", 25);

        await productRepository.create(product1)
        await productRepository.create(product2)
        await productRepository.create(product3)

        const input = [
            {
                id: "1",
                name: "Product 1",
                price: 23
            },
            {
                id: "2",
                name: "Product 2",
                price: 24
            },
            {
                id: "3",
                name: "Product 3",
                price: 25
            }
        ];

        const result = await useCase.execute(input);

        expect(result).toEqual({
            products: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 23
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 24
                },
                {
                    id: "3",
                    name: "Product 3",
                    price: 25
                }
            ]
        });
    });

})