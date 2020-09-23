import { getRepository } from 'typeorm'

import User from '../../models/User';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { id },
    });

    if (!checkUserExists) {
      throw new Error('Usuário não cadastrado no sistema.')
    };

    await usersRepository.delete(id);
  };
};

export default DeleteUserService;
