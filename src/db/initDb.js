const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

async function initializeDb() {
  try {
    console.log('Inicializando banco de dados...');
    
    // Lê o arquivo SQL
    const sqlFilePath = path.join(__dirname, 'init.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Divide o script em instruções individuais
    // Considera que cada instrução termina com ponto e vírgula seguido de nova linha ou fim de arquivo
    const sqlStatements = sqlScript.split(/;\s*[\r\n]+/);
    
    // Executa cada instrução separadamente
    for (const statement of sqlStatements) {
      const trimmedStatement = statement.trim();
      if (trimmedStatement && !trimmedStatement.startsWith('--')) {
        try {
          await pool.query(trimmedStatement + ';');
        } catch (err) {
          // Registra o erro, mas continua tentando as próximas instruções
          console.error(`Erro ao executar instrução SQL: ${err.message}`);
          console.error(`Instrução: ${trimmedStatement.substring(0, 100)}...`);
        }
      }
    }
    
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error.message);
    // Não termina o processo em caso de erro
  }
}

module.exports = { initializeDb }; 