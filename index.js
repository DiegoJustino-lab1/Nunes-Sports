const mysql = require('mysql2');

// Cria a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost', // substitua pelo host do seu banco de dados
  user: 'root', // substitua pelo seu usuário do banco de dados
  password: '', // substitua pela sua senha do banco de dados
  database: 'nunessports', // substitua pelo nome do seu banco de dados
  port: 3306 // porta padrão do MySQL
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

// Exemplo de consulta
connection.query('SELECT * FROM produtos', (error, results, fields) => {
  if (error) throw error;
  console.log('Resultados da consulta:', results);
});

// Fecha a conexão
connection.end();