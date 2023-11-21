import bcrypt from 'bcryptjs';
import { prisma, exclude } from '../database/prisma.provider.js';
import authService from './auth.service.js';

class UserService {
  async findUsers() {
    const users = await prisma.user.findMany(
      {
        include: {
          telefones: true,
        },
      },
    ).then((data) => data.map((user) => exclude(user, ['senha'])));

    return users;
  }

  async findUnique(id) {
    if (!id) throw new Error('ID não informado');

    const user = await prisma.user.findUniqueOrThrow(
      {
        where: {
          id: Number(id),
        },
        include: {
          telefones: true,
        },
      },
    );

    return exclude(user, ['senha']);
  }

  async create(user) {
    const userExists = await prisma.user.findUnique(
      {
        where: {
          email: user.email,
        },
      },
    );

    if (userExists) {
      throw new Error('E-mail já existente');
    }

    if (user.senha.length < 4) throw new Error('Senha deve ter no mínimo 4 caracteres');

    const newUser = await prisma.user.create(
      {
        data: {
          nome: user.nome,
          email: user.email,
          senha: bcrypt.hashSync(user.senha, 10),
          telefones: {
            create: user.telefones,
          },
        },
      },
    );

    const auth = await authService.signIn(newUser.email, user.senha);

    return auth;
  }

  async update(id, user) {
    if (!id) throw new Error('ID não informado');

    const userExists = await prisma.user.findUnique(
      {
        where: {
          id: Number(id),
        },
      },
    );

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }
    if (user.senha && user.senha.length < 4) throw new Error('Senha deve ter no mínimo 4 caracteres');

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        nome: user.nome,
        email: user.email,
        senha: user.senha ? bcrypt.hashSync(user.senha, 10) : undefined,
      },
    });
  }

  async delete(id) {
    if (!id) throw new Error('ID não informado');

    const userExists = await prisma.user.findUnique(
      {
        where: {
          id: Number(id),
        },
      },
    );

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    await prisma.user.delete(
      {
        where: {
          id: Number(id),
        },
      },
    );
  }

  async createUserPhone(id, phone) {
    if (!id) throw new Error('ID não informado');

    const userExists = await prisma.user.findUnique(
      {
        where: {
          id: Number(id),
        },
      },
    );

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    await prisma.telefone.create(
      {
        data: {
          numero: phone.numero,
          ddd: phone.ddd,
          userId: Number(id),
        },
      },
    );
  }

  async updateUserPhone(id, phone) {
    if (!id) throw new Error('ID não informado');

    const phoneExists = await prisma.telefone.findUnique(
      {
        where: {
          id: Number(id),
        },
      },
    );

    if (!phoneExists) {
      throw new Error('Usuário não encontrado');
    }

    await prisma.telefone.update(
      {
        where: {
          id: Number(id),
        },
        data: {
          numero: phone.numero,
          ddd: phone.ddd,
        },
      },
    );
  }
}

export default new UserService();
