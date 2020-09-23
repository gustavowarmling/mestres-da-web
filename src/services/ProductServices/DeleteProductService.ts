import { getRepository } from 'typeorm'

import Product from '../../models/Product';

class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getRepository(Product);

    const checkProductExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductExists) {
      throw new Error('Esse produto não existe no sistema.')
    };

    await productsRepository.delete(id);
  };
};

export default DeleteProductService;
