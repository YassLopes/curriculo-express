const Education = require('../models/Education');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Controlador para educação
const educationController = {
  // Obter todos os registros de educação
  getAllEducation: async (req, res, next) => {
    try {
      const education = await Education.findAll();
      res.json(education);
    } catch (error) {
      next(error);
    }
  },

  // Obter registro de educação por ID
  getEducationById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const education = await Education.findById(id);
      
      if (!education) {
        return res.status(404).json({ message: 'Registro de educação não encontrado' });
      }
      
      res.json(education);
    } catch (error) {
      next(error);
    }
  },

  // Obter educação por usuário
  getEducationByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      
      // Verificar se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const education = await Education.findByUserId(userId);
      res.json(education);
    } catch (error) {
      next(error);
    }
  },

  // Criar novo registro de educação
  createEducation: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const educationData = req.body;
      
      // Verificar se o usuário existe
      const user = await User.findById(educationData.user_id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const newEducation = await Education.create(educationData);
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  },

  // Atualizar registro de educação
  updateEducation: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const educationData = req.body;
      
      const existingEducation = await Education.findById(id);
      if (!existingEducation) {
        return res.status(404).json({ message: 'Registro de educação não encontrado' });
      }
      
      const updatedEducation = await Education.update(id, educationData);
      res.json(updatedEducation);
    } catch (error) {
      next(error);
    }
  },

  // Excluir registro de educação
  deleteEducation: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingEducation = await Education.findById(id);
      
      if (!existingEducation) {
        return res.status(404).json({ message: 'Registro de educação não encontrado' });
      }
      
      await Education.delete(id);
      res.json({ message: 'Registro de educação excluído com sucesso' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = educationController; 