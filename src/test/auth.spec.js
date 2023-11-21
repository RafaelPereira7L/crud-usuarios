/* eslint-disable no-undef */
import AuthService from '../services/auth.service.js';

describe('AuthService', () => {
  describe('signIn', () => {
    it('deve lançar um erro se nenhum e-mail for fornecido', async () => {
      try {
        await AuthService.signIn('', 'password123');
      } catch (error) {
        expect(error.message).toBe('E-mail não informado');
      }
    });

    it('deve lançar um erro se nenhuma senha for fornecida', async () => {
      try {
        await AuthService.signIn('johndoe@example.com', '');
      } catch (error) {
        expect(error.message).toBe('Senha não informada');
      }
    });

    it('deve lançar um erro se o usuário não existir', async () => {
      try {
        await AuthService.signIn('johndoe@example.com', 'password123');
      } catch (error) {
        expect(error.message).toBe('Usuário e/ou senha inválidos');
      }
    });

    it('deve lançar um erro se a senha estiver incorreta', async () => {
      try {
        await AuthService.signIn('johndoe@example.com', 'password321');
      } catch (error) {
        expect(error.message).toBe('Usuário e/ou senha inválidos');
      }
    });

    it('deve retornar um token se as credenciais forem válidas', async () => {
      const user = {
        email: 'johndoe@example.com',
        senha: 'password123',
      };

      const token = await AuthService.signIn(user.email, user.senha);
      console.log(token);
      expect(token).toHaveProperty('token');
    });
  });
});
