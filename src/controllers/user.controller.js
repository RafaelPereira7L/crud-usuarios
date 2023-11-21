import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';

class UserController {
  async signIn(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await authService.signIn(email, senha);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const users = await userService.findUsers();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async findById(req, res) {
    try {
      const user = await userService.findUnique(
        Number(req.params.id),
      );

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async create(req, res) {
    try {
      const payload = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        telefones: req.body.telefones,
      };

      const newUser = await userService.create(payload);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async update(req, res) {
    try {
      const payload = {
        email: req.body.email,
        nome: req.body.nome,
        senha: req.body.senha,
      };

      await userService.update(
        Number(req.params.id),
        payload,
      );

      return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async delete(req, res) {
    try {
      await userService.delete(Number(req.params.id));

      return res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async createUserPhone(req, res) {
    try {
      await userService.createUserPhone(
        Number(req.params.userId),
        {
          numero: req.body.numero,
          ddd: req.body.ddd,
        },
      );

      return res.status(201).json({ mensagem: 'Telefone criado com sucesso' });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async updateUserPhone(req, res) {
    try {
      await userService.updateUserPhone(
        Number(req.params.phoneId),
        { numero: req.body.numero, ddd: req.body.ddd },
      );

      return res.status(200).json({ mensagem: 'Telefone atualizado com sucesso' });
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }
}

export default new UserController();
