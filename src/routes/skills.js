const express = require('express');
const { check } = require('express-validator');
const skillController = require('../controllers/skillController');

const router = express.Router();

// Validações para habilidades
const skillValidation = [
  check('user_id').isNumeric().withMessage('ID de usuário inválido'),
  check('name').notEmpty().withMessage('Nome da habilidade é obrigatório'),
  check('level').isInt({ min: 1, max: 5 }).withMessage('Nível deve ser um número entre 1 e 5')
];

// GET /api/skills - Obter todas as habilidades
router.get('/', skillController.getAllSkills);

// GET /api/skills/:id - Obter habilidade por ID
router.get('/:id', skillController.getSkillById);

// GET /api/skills/user/:userId - Obter habilidades por usuário
router.get('/user/:userId', skillController.getSkillsByUserId);

// POST /api/skills - Criar nova habilidade
router.post('/', skillValidation, skillController.createSkill);

// PUT /api/skills/:id - Atualizar habilidade
router.put('/:id', skillValidation, skillController.updateSkill);

// DELETE /api/skills/:id - Excluir habilidade
router.delete('/:id', skillController.deleteSkill);

module.exports = router; 