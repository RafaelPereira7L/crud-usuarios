/* eslint-disable no-undef */
import UserService from '../services/user.service.js';

describe('UserService', () => {
  describe('findUsers', () => {
    it('deve retornar uma lista de usuários', async () => {
      const users = await UserService.findUsers();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('findUnique', () => {
    it('deve retornar um usuário com o ID especificado', async () => {
      const user = await UserService.findUnique(2);
      expect(user.id).toBe(2);
    });

    it('deve lançar um erro se o usuário não existir', async () => {
      try {
        await UserService.findUnique(-1);
      } catch (error) {
        expect(error.message).toBe('No User found');
      }
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const user = {
        nome: 'John Doe',
        email: `johndoe${Math.random()}@example.com`,
        senha: 'password123',
        telefones: [{ numero: '1234567890', ddd: '11' }],
      };

      const newUser = await UserService.create(user);
      expect(newUser.id).toBeGreaterThan(0);
    });

    it('deve lançar um erro se o e-mail já estiver em uso', async () => {
      const user = {
        nome: 'John Doe',
        email: 'teste@teste.com',
        senha: 'password123',
        telefones: [{ numero: '1234567890', ddd: '11' }],
      };

      try {
        await UserService.create(user);
      } catch (error) {
        expect(error.message).toBe('E-mail já existente');
      }
    });

    it('deve lançar um erro se a senha tiver menos de 4 caracteres', async () => {
      const user = {
        nome: 'John Doe',
        email: `johndoe${Math.random()}@example.com`,
        senha: '123',
        telefones: [{ numero: '1234567890', ddd: '11' }],
      };

      try {
        await UserService.create(user);
      } catch (error) {
        expect(error.message).toBe('Senha deve ter no mínimo 4 caracteres');
      }
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário', async () => {
      const user = {
        nome: 'John Doe',
        email: `johndoe${Math.random()}@example.com`,
        senha: 'password123',
        telefones: [{ numero: '1234567890', ddd: '11' }],
      };

      const newUser = await UserService.create(user);

      const updatedUser = {
        id: newUser.id,
        nome: 'John Doe Updated',
        email: `johndoe${Math.random()}@updated.com`,
        senha: 'password321',
      };

      await UserService.update(newUser.id, updatedUser);

      const userAfterUpdate = await UserService.findUnique(newUser.id);
      expect(userAfterUpdate.nome).toBe(updatedUser.nome);
      expect(userAfterUpdate.email).toBe(updatedUser.email);
    });

    it('deve lançar um erro se o usuário não existir', async () => {
      try {
        await UserService.update(-1, { nome: 'Jane Doe' });
      } catch (error) {
        expect(error.message).toBe('Usuário não encontrado');
      }
    });
  });
});
