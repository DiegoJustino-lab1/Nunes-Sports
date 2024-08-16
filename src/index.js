import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js'; // Certifique-se de incluir a extensão .js

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Servir arquivos estáticos do diretório 'public'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas definidas no arquivo routes.js
app.use('/api', routes);

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});