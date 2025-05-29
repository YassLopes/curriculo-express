const db = require('../config/db');

// Modelo para usuários
const User = {
  // Buscar todos os usuários
  findAll: async () => {
    const result = await db.query(
      'SELECT id, name, email, location, title, about, profile_image, phone, created_at, updated_at FROM users ORDER BY id'
    );
    return result.rows;
  },

  // Buscar usuário por ID
  findById: async (id) => {
    const result = await db.query(
      'SELECT id, name, email, location, title, about, profile_image, phone, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Buscar usuário por email
  findByEmail: async (email) => {
    const result = await db.query(
      'SELECT id, name, email, location, title, about, profile_image, phone, created_at, updated_at FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  // Criar novo usuário
  create: async (userData) => {
    const { name, email, location, title, about, profile_image, phone } = userData;
    const result = await db.query(
      'INSERT INTO users (name, email, location, title, about, profile_image, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, location, title, about, profile_image, phone]
    );
    return result.rows[0];
  },

  // Atualizar usuário
  update: async (id, userData) => {
    const { name, email, location, title, about, profile_image, phone } = userData;
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, location = $3, title = $4, about = $5, profile_image = $6, phone = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [name, email, location, title, about, profile_image, phone, id]
    );
    return result.rows[0];
  },

  // Deletar usuário
  delete: async (id) => {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    return { id };
  }
};

module.exports = User; 