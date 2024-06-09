import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListCustomerDto } from "../../customer/list/list.customer.dto";
import { OutputListProductDto } from "./list.product.dto";


export default class ListProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput(product: Product[]): OutputListProductDto {
    return {
      products: product.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price
      })),
    };
  }
}