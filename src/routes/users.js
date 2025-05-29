const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

// Validações para usuário
const userValidation = [
  check('name').notEmpty().withMessage('Nome é obrigatório'),
  check('email').isEmail().withMessage('Email inválido'),
  check('location').optional(),
  check('title').optional(),
  check('about').optional(),
  check('profile_image').optional(),
  check('phone').optional()
];

// GET /api/users - Obter todos os usuários
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Obter usuário por ID
router.get('/:id', userController.getUserById);

// POST /api/users - Criar um novo usuário
router.post('/', userValidation, userController.createUser);

// PUT /api/users/:id - Atualizar um usuário
router.put('/:id', userValidation, userController.updateUser);

// DELETE /api/users/:id - Excluir um usuário
router.delete('/:id', userController.deleteUser);

module.exports = router; 