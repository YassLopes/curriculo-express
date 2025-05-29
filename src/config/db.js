const { Pool } = require('pg');
require('dotenv').config();

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Configurações otimizadas para ambiente de produção
  max: 20, // máximo de conexões no pool
  idleTimeoutMillis: 30000, // tempo que uma conexão pode ficar inativa (30 segundos)
  connectionTimeoutMillis: 10000, // timeout de conexão (10 segundos)
  statement_timeout: 60000 // timeout para statements SQL (1 minuto)
});

// Teste de conexão
pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL com sucesso');
});

// Tratamento de erros de conexão
pool.on('error', (err) => {
  console.error('Erro na conexão com o PostgreSQL:', err);
  // Em produção, não queremos que o servidor caia por erro de conexão
  if (process.env.NODE_ENV !== 'production') {
    process.exit(-1);
  }
});

// Função auxiliar para executar queries com retry
const query = async (text, params, retries = 3) => {
  try {
    return await pool.query(text, params);
  } catch (err) {
    if (retries > 0 && (err.code === 'ECONNREFUSED' || err.code === '08006' || err.code === '08001')) {
      console.log(`Tentando reconectar ao banco de dados. Tentativas restantes: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // espera 1 segundo
      return query(text, params, retries - 1);
    }
    throw err;
  }
};

module.exports = {
  query,
  pool
};