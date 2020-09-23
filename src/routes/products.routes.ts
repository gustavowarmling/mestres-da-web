import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateProductService from '../services/ProductServices/CreateProductService';
import UpdateProductService from '../services/ProductServices/UpdateProductService';
import DeleteProductService from '../services/ProductServices/DeleteProductService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository('products');

  const { sku } = request.body;

  if (sku) {
    const [product, quantity] = await productsRepository.findAndCount({
      where: { sku }
    });

    return response.json({ product, quantity });
  };

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.get('/:id', async (request, response) => {
  const productsRepository = getRepository('products');

  const { id } = request.params;

  if (id) {
    const product = await productsRepository.findOne({
      where: { id }
    });

    return response.json(product);
  };

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', ensureAuthenticated, async (request, response) => {
  try {
    const { name, description, size, price, quantity, sku } = request.body;

    const createProduct = new CreateProductService();

    let productsArray = [];

    for (let i = 0; i < quantity; i++) {
      productsArray.push(
        await createProduct.execute({
          name,
          description,
          size,
          price,
          sku
        })
      );
    };

    return response.json(productsArray);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

productsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  try {
    const { name, description, size, price, sku } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      description,
      size,
      price,
      sku
    });

    return response.json(product);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

productsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  try {
    let { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute(id);

    return response.status(200).json(`Produto de id: ${id} deletado com sucesso!`);
  } catch (error) {
    return response.status(400).json({ error: error.message })
  };
});

export default productsRouter;