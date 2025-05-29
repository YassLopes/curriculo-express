const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importação do inicializador de banco de dados
const { initializeDb } = require('./db/initDb');

// Importação das rotas
const userRoutes = require('./routes/users');
const educationRoutes = require('./routes/education');
const experienceRoutes = require('./routes/experience');
const skillsRoutes = require('./routes/skills');

// Inicialização do app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillsRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Currículo - Bem-vindo!',
    endpoints: {
      users: '/api/users',
      education: '/api/education',
      experience: '/api/experience',
      skills: '/api/skills'
    }
  });
});

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ocorreu um erro no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Inicializar banco de dados e depois iniciar servidor
(async () => {
  try {
    // Inicializa o banco de dados
    await initializeDb();
    
    // Inicialização do servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar aplicação:', error);
    process.exit(1);
  }
})(); 