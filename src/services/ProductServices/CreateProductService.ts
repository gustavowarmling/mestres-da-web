import { getRepository } from 'typeorm'

import Product from '../../models/Product';

interface Request {
  name: string,
  description: string,
  size: number,
  price: number,
  sku: string;
}

class CreateProductService {
  public async execute({ name, description, size, price, sku }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = productsRepository.create({
      name,
      description,
      size,
      price,
      sku,
    });

    await productsRepository.save(product);

    return product;
  };
};

export default CreateProductService;
