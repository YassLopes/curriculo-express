const Experience = require('../models/Experience');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Controlador para experiência profissional
const experienceController = {
  // Obter todas as experiências
  getAllExperience: async (req, res, next) => {
    try {
      const experiences = await Experience.findAll();
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  },

  // Obter experiência por ID
  getExperienceById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const experience = await Experience.findById(id);
      
      if (!experience) {
        return res.status(404).json({ message: 'Experiência não encontrada' });
      }
      
      res.json(experience);
    } catch (error) {
      next(error);
    }
  },

  // Obter experiências por usuário
  getExperienceByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      
      // Verificar se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const experiences = await Experience.findByUserId(userId);
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  },

  // Criar nova experiência
  createExperience: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const experienceData = req.body;
      
      // Verificar se o usuário existe
      const user = await User.findById(experienceData.user_id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      // Se experiência atual, definir end_date como null
      if (experienceData.current) {
        experienceData.end_date = null;
      }
      
      const newExperience = await Experience.create(experienceData);
      res.status(201).json(newExperience);
    } catch (error) {
      next(error);
    }
  },

  // Atualizar experiência
  updateExperience: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const experienceData = req.body;
      
      const existingExperience = await Experience.findById(id);
      if (!existingExperience) {
        return res.status(404).json({ message: 'Experiência não encontrada' });
      }
      
      // Se experiência atual, definir end_date como null
      if (experienceData.current) {
        experienceData.end_date = null;
      }
      
      const updatedExperience = await Experience.update(id, experienceData);
      res.json(updatedExperience);
    } catch (error) {
      next(error);
    }
  },

  // Excluir experiência
  deleteExperience: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingExperience = await Experience.findById(id);
      
      if (!existingExperience) {
        return res.status(404).json({ message: 'Experiência não encontrada' });
      }
      
      await Experience.delete(id);
      res.json({ message: 'Experiência excluída com sucesso' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = experienceController; 