const db = require('../config/db');

// Modelo para experiência profissional
const Experience = {
  // Buscar todas as experiências
  findAll: async () => {
    const result = await db.query(
      'SELECT * FROM experience ORDER BY start_date DESC'
    );
    return result.rows;
  },

  // Buscar experiência por ID
  findById: async (id) => {
    const result = await db.query(
      'SELECT * FROM experience WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Buscar experiências por usuário
  findByUserId: async (userId) => {
    const result = await db.query(
      'SELECT * FROM experience WHERE user_id = $1 ORDER BY start_date DESC',
      [userId]
    );
    return result.rows;
  },

  // Criar nova experiência
  create: async (experienceData) => {
    const { user_id, company, position, location, start_date, end_date, current, description } = experienceData;
    const result = await db.query(
      'INSERT INTO experience (user_id, company, position, location, start_date, end_date, current, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id, company, position, location, start_date, end_date, current, description]
    );
    return result.rows[0];
  },

  // Atualizar experiência
  update: async (id, experienceData) => {
    const { company, position, location, start_date, end_date, current, description } = experienceData;
    const result = await db.query(
      'UPDATE experience SET company = $1, position = $2, location = $3, start_date = $4, end_date = $5, current = $6, description = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [company, position, location, start_date, end_date, current, description, id]
    );
    return result.rows[0];
  },

  // Deletar experiência
  delete: async (id) => {
    await db.query('DELETE FROM experience WHERE id = $1', [id]);
    return { id };
  }
};

module.exports = Experience; 