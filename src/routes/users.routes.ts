import { Router } from 'express';

import CreateUserService from '../services/UserServices/CreateUserService';
import UpdateUserService from '../services/UserServices/UpdateUserService';
import DeleteUserService from '../services/UserServices/DeleteUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService;

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const { id } = request.user;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  try {
    let { id } = request.user;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute(id);

    return response.status(200).json(`Usuário de id: ${id} deletado com sucesso!`);
  } catch (error) {
    return response.status(400).json({ error: error.message })
  };
});

export default usersRouter;