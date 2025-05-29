const db = require('../config/db');

// Modelo para educação
const Education = {
  // Buscar todos os registros de educação
  findAll: async () => {
    const result = await db.query(
      'SELECT * FROM education ORDER BY start_date DESC'
    );
    return result.rows;
  },

  // Buscar registro de educação por ID
  findById: async (id) => {
    const result = await db.query(
      'SELECT * FROM education WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Buscar educação por usuário
  findByUserId: async (userId) => {
    const result = await db.query(
      'SELECT * FROM education WHERE user_id = $1 ORDER BY start_date DESC',
      [userId]
    );
    return result.rows;
  },

  // Criar novo registro de educação
  create: async (educationData) => {
    const { user_id, institution, degree, field, start_date, end_date, description } = educationData;
    const result = await db.query(
      'INSERT INTO education (user_id, institution, degree, field, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, institution, degree, field, start_date, end_date, description]
    );
    return result.rows[0];
  },

  // Atualizar registro de educação
  update: async (id, educationData) => {
    const { institution, degree, field, start_date, end_date, description } = educationData;
    const result = await db.query(
      'UPDATE education SET institution = $1, degree = $2, field = $3, start_date = $4, end_date = $5, description = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [institution, degree, field, start_date, end_date, description, id]
    );
    return result.rows[0];
  },

  // Deletar registro de educação
  delete: async (id) => {
    await db.query('DELETE FROM education WHERE id = $1', [id]);
    return { id };
  }
};

module.exports = Education; 