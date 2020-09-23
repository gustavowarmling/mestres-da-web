import { getRepository } from 'typeorm'

import Product from '../../models/Product';

interface Request {
  id: string;
  name: string,
  description: string,
  size: number,
  price: number,
  sku: string,
}

class CreateProductService {
  public async execute({ id, name, description, size, price, sku }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const checkProductExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductExists) {
      throw new Error('Esse produto não foi encontrado no sistema!');
    }

    await productsRepository.update(id, {
      name,
      description,
      price,
      size,
      sku
    });

    const product = await productsRepository.findOne({
      where: { id },
    });

    return product as Product;
  };
};

export default CreateProductService;
