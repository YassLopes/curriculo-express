const express = require('express');
const { check } = require('express-validator');
const educationController = require('../controllers/educationController');

const router = express.Router();

// Validações para educação
const educationValidation = [
  check('user_id').isNumeric().withMessage('ID de usuário inválido'),
  check('institution').notEmpty().withMessage('Instituição é obrigatória'),
  check('degree').notEmpty().withMessage('Grau/Diploma é obrigatório'),
  check('field').optional(),
  check('start_date').isDate().withMessage('Data de início inválida'),
  check('end_date').optional({ nullable: true }).isDate().withMessage('Data de término inválida'),
  check('description').optional()
];

// GET /api/education - Obter todos os registros de educação
router.get('/', educationController.getAllEducation);

// GET /api/education/:id - Obter registro de educação por ID
router.get('/:id', educationController.getEducationById);

// GET /api/education/user/:userId - Obter educação por usuário
router.get('/user/:userId', educationController.getEducationByUserId);

// POST /api/education - Criar novo registro de educação
router.post('/', educationValidation, educationController.createEducation);

// PUT /api/education/:id - Atualizar registro de educação
router.put('/:id', educationValidation, educationController.updateEducation);

// DELETE /api/education/:id - Excluir registro de educação
router.delete('/:id', educationController.deleteEducation);

module.exports = router; 