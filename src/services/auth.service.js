import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma.provider.js';

class AuthService {
  async signIn(email, senha) {
    if (!email) throw new Error('E-mail não informado');
    if (!senha) throw new Error('Senha não informada');

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error('Usuário e/ou senha inválidos');
    }
    const passwordIsValid = bcrypt.compareSync(
      senha,
      userExists.senha,
    );

    if (!passwordIsValid) {
      throw new Error('Usuário e/ou senha inválidos');
    }

    const lastLogin = await prisma.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        ultimo_login: new Date(),
      },
    });

    const token = jwt.sign(
      { id: userExists.id, nome: userExists.nome, email: userExists.email },
      process.env.SECRET,

      {
        expiresIn: '30m',
      },
    );

    return {
      id: userExists.id,
      data_criacao: userExists.data_criacao,
      data_atualizacao: userExists.data_atualizacao,
      ultimo_login: lastLogin.ultimo_login,
      token: `Bearer ${token}`,
    };
  }

  verifyToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ mensagem: 'Token não informado' });
    }

    const [, token] = authorization.split(' ');
    try {
      const decoded = jwt.decode(token, process.env.SECRET);

      if (decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ mensagem: 'Sessão inválida' });
      }

      const { id, nome, email } = decoded;
      res.userData = { id, nome, email };

      return next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
  }
}

export default new AuthService();
