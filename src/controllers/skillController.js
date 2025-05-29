const Skill = require('../models/Skill');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Controlador para habilidades
const skillController = {
  // Obter todas as habilidades
  getAllSkills: async (req, res, next) => {
    try {
      const skills = await Skill.findAll();
      res.json(skills);
    } catch (error) {
      next(error);
    }
  },

  // Obter habilidade por ID
  getSkillById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const skill = await Skill.findById(id);
      
      if (!skill) {
        return res.status(404).json({ message: 'Habilidade não encontrada' });
      }
      
      res.json(skill);
    } catch (error) {
      next(error);
    }
  },

  // Obter habilidades por usuário
  getSkillsByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      
      // Verificar se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const skills = await Skill.findByUserId(userId);
      res.json(skills);
    } catch (error) {
      next(error);
    }
  },

  // Criar nova habilidade
  createSkill: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const skillData = req.body;
      
      // Verificar se o usuário existe
      const user = await User.findById(skillData.user_id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      // Validar nível de habilidade
      if (skillData.level < 1 || skillData.level > 5) {
        return res.status(400).json({ message: 'Nível de habilidade deve ser entre 1 e 5' });
      }
      
      const newSkill = await Skill.create(skillData);
      res.status(201).json(newSkill);
    } catch (error) {
      next(error);
    }
  },

  // Atualizar habilidade
  updateSkill: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const skillData = req.body;
      
      const existingSkill = await Skill.findById(id);
      if (!existingSkill) {
        return res.status(404).json({ message: 'Habilidade não encontrada' });
      }
      
      // Validar nível de habilidade
      if (skillData.level && (skillData.level < 1 || skillData.level > 5)) {
        return res.status(400).json({ message: 'Nível de habilidade deve ser entre 1 e 5' });
      }
      
      const updatedSkill = await Skill.update(id, skillData);
      res.json(updatedSkill);
    } catch (error) {
      next(error);
    }
  },

  // Excluir habilidade
  deleteSkill: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingSkill = await Skill.findById(id);
      
      if (!existingSkill) {
        return res.status(404).json({ message: 'Habilidade não encontrada' });
      }
      
      await Skill.delete(id);
      res.json({ message: 'Habilidade excluída com sucesso' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = skillController; 