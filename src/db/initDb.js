const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

// Função para esperar a conexão ser estabelecida
function waitForConnection(maxAttempts = 5, delay = 2000) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const tryConnect = async () => {
      try {
        console.log(`Tentativa ${attempts + 1} de ${maxAttempts} para conectar ao banco de dados...`);
        // Testa a conexão com uma query simples
        await pool.query('SELECT NOW()');
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        resolve();
      } catch (err) {
        attempts++;
        console.log(`Falha na conexão: ${err.message}`);
        
        if (attempts >= maxAttempts) {
          reject(new Error(`Não foi possível conectar ao banco após ${maxAttempts} tentativas: ${err.message}`));
          return;
        }
        
        console.log(`Aguardando ${delay}ms antes da próxima tentativa...`);
        setTimeout(tryConnect, delay);
      }
    };
    
    tryConnect();
  });
}

async function initializeDb() {
  try {
    console.log('Inicializando banco de dados...');
    
    // Espera a conexão ser estabelecida antes de continuar
    await waitForConnection();
    
    // Verifica se a tabela users existe
    try {
      const checkTable = await pool.query("SELECT to_regclass('public.users') as exists");
      const tableExists = checkTable.rows[0].exists !== null;
      
      if (tableExists) {
        console.log('Tabelas já existem, pulando inicialização do banco de dados.');
        return;
      }
    } catch (err) {
      console.log('Verificação de tabelas falhou, continuando com a inicialização:', err.message);
    }
    
    // Definição das tabelas diretamente no código para evitar problemas de parsing
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        location VARCHAR(100),
        title VARCHAR(100),
        about TEXT,
        profile_image VARCHAR(255),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    const createEducationTable = `
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        institution VARCHAR(100) NOT NULL,
        degree VARCHAR(100) NOT NULL,
        field VARCHAR(100),
        start_date DATE NOT NULL,
        end_date DATE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    const createExperienceTable = `
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        company VARCHAR(100) NOT NULL,
        position VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        start_date DATE NOT NULL,
        end_date DATE,
        current BOOLEAN DEFAULT FALSE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    const createSkillsTable = `
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        level INTEGER CHECK (level BETWEEN 1 AND 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    // Dados de exemplo para Yasmin
    const insertYasmin = `
      INSERT INTO users (name, email, location, title, about)
      VALUES (
        'Yasmin Lopes',
        'yasslopes2001@gmail.com',
        'Recife, Pernambuco',
        'Desenvolvedora de Software',
        'Desenvolvedora de software com 1 ano de experiência em desenvolvimento web, especializada em JavaScript, React e Node.js. Apaixonada por criar soluções eficientes e interfaces intuitivas.'
      )
    `;
    
    // Dados de exemplo para João
    const insertJoao = `
      INSERT INTO users (name, email, location, title, about)
      VALUES (
        'João Silva',
        'joao.silva@exemplo.com',
        'São Paulo, SP',
        'Engenheiro de Software Sênior',
        'Engenheiro de Software com mais de 8 anos de experiência em desenvolvimento fullstack, especializado em arquitetura de sistemas e liderança técnica de equipes.'
      )
    `;
    
    // Criando tabelas em ordem com tratamento de erro para cada operação
    try {
      console.log('Criando tabela users...');
      await pool.query(createUsersTable);
    } catch (err) {
      console.error('Erro ao criar tabela users:', err.message);
      // Continua tentando as próximas tabelas
    }
    
    try {
      console.log('Criando tabela education...');
      await pool.query(createEducationTable);
    } catch (err) {
      console.error('Erro ao criar tabela education:', err.message);
    }
    
    try {
      console.log('Criando tabela experience...');
      await pool.query(createExperienceTable);
    } catch (err) {
      console.error('Erro ao criar tabela experience:', err.message);
    }
    
    try {
      console.log('Criando tabela skills...');
      await pool.query(createSkillsTable);
    } catch (err) {
      console.error('Erro ao criar tabela skills:', err.message);
    }
    
    // Inserindo dados com tratamento de erro para cada operação
    try {
      console.log('Inserindo dados de Yasmin...');
      await pool.query(insertYasmin);
    } catch (err) {
      console.error('Erro ao inserir dados de Yasmin:', err.message);
    }
    
    try {
      console.log('Inserindo dados de João...');
      await pool.query(insertJoao);
    } catch (err) {
      console.error('Erro ao inserir dados de João:', err.message);
    }
    
    // Inserindo dados relacionados com tratamento de erro para cada operação
    try {
      console.log('Inserindo educação para Yasmin...');
      await pool.query(`
        INSERT INTO education (user_id, institution, degree, field, start_date, end_date, description)
        VALUES 
        (1, 'Universidade Federal de Pernambuco', 'Bacharelado', 'Ciência da Computação', '2019-03-01', '2023-12-15', 'Foco em desenvolvimento de software e inteligência artificial'),
        (1, 'Curso Online XYZ', 'Certificação', 'Desenvolvimento Web', '2022-01-10', '2022-06-20', 'Especialização em React e Node.js')
      `);
    } catch (err) {
      console.error('Erro ao inserir educação para Yasmin:', err.message);
    }
    
    try {
      console.log('Inserindo educação para João...');
      await pool.query(`
        INSERT INTO education (user_id, institution, degree, field, start_date, end_date, description)
        VALUES 
        (2, 'Universidade de São Paulo', 'Bacharelado', 'Engenharia de Computação', '2011-02-01', '2015-12-20', 'Formação em sistemas distribuídos e computação de alto desempenho'),
        (2, 'Stanford Online', 'Certificação', 'Gerenciamento de Projetos Ágeis', '2017-05-10', '2017-08-15', 'Certificação em metodologias ágeis e gerenciamento de equipes')
      `);
    } catch (err) {
      console.error('Erro ao inserir educação para João:', err.message);
    }
    
    try {
      console.log('Inserindo experiência para Yasmin...');
      await pool.query(`
        INSERT INTO experience (user_id, company, position, location, start_date, end_date, current, description)
        VALUES 
        (1, 'TechSolutions', 'Desenvolvedora Frontend', 'Recife, PE', '2023-01-15', NULL, TRUE, 'Desenvolvimento de aplicações web usando React, TypeScript e Redux. Implementação de testes automatizados e integração contínua.'),
        (1, 'StartupXYZ', 'Estagiária de Desenvolvimento', 'Remoto', '2022-06-01', '2022-12-30', FALSE, 'Desenvolvimento de componentes frontend e APIs REST simples usando Node.js e Express.')
      `);
    } catch (err) {
      console.error('Erro ao inserir experiência para Yasmin:', err.message);
    }
    
    try {
      console.log('Inserindo experiência para João...');
      await pool.query(`
        INSERT INTO experience (user_id, company, position, location, start_date, end_date, current, description)
        VALUES 
        (2, 'Grande Empresa Tech', 'Engenheiro de Software Sênior', 'São Paulo, SP', '2020-03-10', NULL, TRUE, 'Liderança técnica de equipe de desenvolvimento, arquitetura de sistemas e implementação de microsserviços.'),
        (2, 'Consultoria ABC', 'Desenvolvedor Fullstack', 'São Paulo, SP', '2015-02-15', '2020-02-28', FALSE, 'Desenvolvimento de soluções web e mobile para clientes de diversos segmentos usando JavaScript, React e Node.js.')
      `);
    } catch (err) {
      console.error('Erro ao inserir experiência para João:', err.message);
    }
    
    try {
      console.log('Inserindo habilidades para Yasmin...');
      await pool.query(`
        INSERT INTO skills (user_id, name, level)
        VALUES 
        (1, 'JavaScript', 4),
        (1, 'React', 4),
        (1, 'Node.js', 3),
        (1, 'HTML/CSS', 4),
        (1, 'SQL', 3),
        (1, 'Git', 4)
      `);
    } catch (err) {
      console.error('Erro ao inserir habilidades para Yasmin:', err.message);
    }
    
    try {
      console.log('Inserindo habilidades para João...');
      await pool.query(`
        INSERT INTO skills (user_id, name, level)
        VALUES 
        (2, 'JavaScript', 5),
        (2, 'React', 5),
        (2, 'Node.js', 5),
        (2, 'Python', 4),
        (2, 'AWS', 4),
        (2, 'Docker', 5),
        (2, 'Arquitetura de Software', 5)
      `);
    } catch (err) {
      console.error('Erro ao inserir habilidades para João:', err.message);
    }
    
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error.message);
    console.error('Stack:', error.stack);
    // Não termina o processo em caso de erro
  }
}

module.exports = { initializeDb }; 