const express = require('express');
const { check } = require('express-validator');
const experienceController = require('../controllers/experienceController');

const router = express.Router();

// Validações para experiência
const experienceValidation = [
  check('user_id').isNumeric().withMessage('ID de usuário inválido'),
  check('company').notEmpty().withMessage('Empresa é obrigatória'),
  check('position').notEmpty().withMessage('Cargo é obrigatório'),
  check('location').optional(),
  check('start_date').isDate().withMessage('Data de início inválida'),
  check('end_date').optional({ nullable: true }).isDate().withMessage('Data de término inválida'),
  check('current').isBoolean().withMessage('Valor para "atual" deve ser um booleano'),
  check('description').optional()
];

// GET /api/experience - Obter todas as experiências
router.get('/', experienceController.getAllExperience);

// GET /api/experience/:id - Obter experiência por ID
router.get('/:id', experienceController.getExperienceById);

// GET /api/experience/user/:userId - Obter experiências por usuário
router.get('/user/:userId', experienceController.getExperienceByUserId);

// POST /api/experience - Criar nova experiência
router.post('/', experienceValidation, experienceController.createExperience);

// PUT /api/experience/:id - Atualizar experiência
router.put('/:id', experienceValidation, experienceController.updateExperience);

// DELETE /api/experience/:id - Excluir experiência
router.delete('/:id', experienceController.deleteExperience);

module.exports = router; 