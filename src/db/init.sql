-- Inicializa o banco de dados com as tabelas necessárias

-- Criação das tabelas
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
);

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
);

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
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  level INTEGER CHECK (level BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Dados de exemplo
-- Inserindo o currículo de Yasmin Lopes
INSERT INTO users (name, email, location, title, about)
VALUES (
  'Yasmin Lopes',
  'yasslopes2001@gmail.com',
  'Recife, Pernambuco',
  'Desenvolvedora de Software',
  'Desenvolvedora de software com 1 ano de experiência em desenvolvimento web, especializada em JavaScript, React e Node.js. Apaixonada por criar soluções eficientes e interfaces intuitivas.'
);

-- Currículo de outro usuário
INSERT INTO users (name, email, location, title, about)
VALUES (
  'João Silva',
  'joao.silva@exemplo.com',
  'São Paulo, SP',
  'Engenheiro de Software Sênior',
  'Engenheiro de Software com mais de 8 anos de experiência em desenvolvimento fullstack, especializado em arquitetura de sistemas e liderança técnica de equipes.'
);

-- Educação para Yasmin
INSERT INTO education (user_id, institution, degree, field, start_date, end_date, description)
VALUES 
(1, 'Universidade Federal de Pernambuco', 'Bacharelado', 'Ciência da Computação', '2019-03-01', '2023-12-15', 'Foco em desenvolvimento de software e inteligência artificial'),
(1, 'Curso Online XYZ', 'Certificação', 'Desenvolvimento Web', '2022-01-10', '2022-06-20', 'Especialização em React e Node.js');

-- Educação para João
INSERT INTO education (user_id, institution, degree, field, start_date, end_date, description)
VALUES 
(2, 'Universidade de São Paulo', 'Bacharelado', 'Engenharia de Computação', '2011-02-01', '2015-12-20', 'Formação em sistemas distribuídos e computação de alto desempenho'),
(2, 'Stanford Online', 'Certificação', 'Gerenciamento de Projetos Ágeis', '2017-05-10', '2017-08-15', 'Certificação em metodologias ágeis e gerenciamento de equipes');

-- Experiência para Yasmin
INSERT INTO experience (user_id, company, position, location, start_date, end_date, current, description)
VALUES 
(1, 'TechSolutions', 'Desenvolvedora Frontend', 'Recife, PE', '2023-01-15', NULL, TRUE, 'Desenvolvimento de aplicações web usando React, TypeScript e Redux. Implementação de testes automatizados e integração contínua.'),
(1, 'StartupXYZ', 'Estagiária de Desenvolvimento', 'Remoto', '2022-06-01', '2022-12-30', FALSE, 'Desenvolvimento de componentes frontend e APIs REST simples usando Node.js e Express.');

-- Experiência para João
INSERT INTO experience (user_id, company, position, location, start_date, end_date, current, description)
VALUES 
(2, 'Grande Empresa Tech', 'Engenheiro de Software Sênior', 'São Paulo, SP', '2020-03-10', NULL, TRUE, 'Liderança técnica de equipe de desenvolvimento, arquitetura de sistemas e implementação de microsserviços.'),
(2, 'Consultoria ABC', 'Desenvolvedor Fullstack', 'São Paulo, SP', '2015-02-15', '2020-02-28', FALSE, 'Desenvolvimento de soluções web e mobile para clientes de diversos segmentos usando JavaScript, React e Node.js.');

-- Habilidades para Yasmin
INSERT INTO skills (user_id, name, level)
VALUES 
(1, 'JavaScript', 4),
(1, 'React', 4),
(1, 'Node.js', 3),
(1, 'HTML/CSS', 4),
(1, 'SQL', 3),
(1, 'Git', 4);

-- Habilidades para João
INSERT INTO skills (user_id, name, level)
VALUES 
(2, 'JavaScript', 5),
(2, 'React', 5),
(2, 'Node.js', 5),
(2, 'Python', 4),
(2, 'AWS', 4),
(2, 'Docker', 5),
(2, 'Arquitetura de Software', 5); 