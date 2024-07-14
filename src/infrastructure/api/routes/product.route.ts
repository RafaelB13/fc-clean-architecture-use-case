import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const useCase = new ListProductUseCase(new ProductRepository());
    const output = await useCase.execute({});

    res.format({
      json: async () => res.status(200).send(output),
      xml: async () => res.status(200).send(ProductPresenter.listXML(output)),
    })
  } catch (error) {
    res.status(500).json(error);
  };
});
