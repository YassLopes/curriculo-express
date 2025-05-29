const User = require('../models/User');
const { validationResult } = require('express-validator');

// Controlador para usuários
const userController = {
  // Obter todos os usuários
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  // Obter usuário por ID
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Criar um novo usuário
  createUser: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userData = req.body;
      const existingUser = await User.findByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
      
      const newUser = await User.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  // Atualizar um usuário
  updateUser: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const userData = req.body;
      
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      // Verificar se o email já está em uso por outro usuário
      if (userData.email && userData.email !== existingUser.email) {
        const userWithEmail = await User.findByEmail(userData.email);
        if (userWithEmail && userWithEmail.id !== parseInt(id)) {
          return res.status(400).json({ message: 'Email já está em uso' });
        }
      }
      
      const updatedUser = await User.update(id, userData);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  // Excluir um usuário
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingUser = await User.findById(id);
      
      if (!existingUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      await User.delete(id);
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController; 