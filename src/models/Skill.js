const db = require('../config/db');

// Modelo para habilidades
const Skill = {
  // Buscar todas as habilidades
  findAll: async () => {
    const result = await db.query(
      'SELECT * FROM skills ORDER BY level DESC'
    );
    return result.rows;
  },

  // Buscar habilidade por ID
  findById: async (id) => {
    const result = await db.query(
      'SELECT * FROM skills WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Buscar habilidades por usuário
  findByUserId: async (userId) => {
    const result = await db.query(
      'SELECT * FROM skills WHERE user_id = $1 ORDER BY level DESC',
      [userId]
    );
    return result.rows;
  },

  // Criar nova habilidade
  create: async (skillData) => {
    const { user_id, name, level } = skillData;
    const result = await db.query(
      'INSERT INTO skills (user_id, name, level) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, level]
    );
    return result.rows[0];
  },

  // Atualizar habilidade
  update: async (id, skillData) => {
    const { name, level } = skillData;
    const result = await db.query(
      'UPDATE skills SET name = $1, level = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [name, level, id]
    );
    return result.rows[0];
  },

  // Deletar habilidade
  delete: async (id) => {
    await db.query('DELETE FROM skills WHERE id = $1', [id]);
    return { id };
  }
};

module.exports = Skill; 