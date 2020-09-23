import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ id, name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUser = await usersRepository.findOne({
      where: { id },
    });

    if (!checkUser) {
      throw new Error('Usuário não cadastrado no sistema!');
    };

    let hashedPassword = checkUser.password;

    if (password != checkUser.password) {
      hashedPassword = await hash(password, 8);
    };

    if ( email != checkUser.email ) {
      const checkEmailExists = await usersRepository.findOne({
        where: { email },
      });

      if (checkEmailExists) {
        throw Error('Email já cadastrado no sistema!');
      };
    };

    await usersRepository.update(id, {
      name,
      email,
      password: hashedPassword,
    });

    const  user  = await usersRepository.findOne({
      where: { id },
    });
    
    return user as User;
  };
};

export default CreateUserService;
