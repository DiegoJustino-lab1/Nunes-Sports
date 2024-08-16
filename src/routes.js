import express from 'express';
import db from './db.js';

const router = express.Router();

// Create - Adicionar um novo produto
router.post('/produtos', (req, res) => {
  const { nome, codigo, descricao, preco } = req.body;
  const query = 'INSERT INTO produtos (nome, codigo, descricao, preco) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, codigo, descricao, preco], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, nome, codigo, descricao, preco });
  });
});

// Read - Obter todos os produtos
router.get('/produtos', (req, res) => {
  const query = 'SELECT * FROM produtos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// Update - Atualizar um produto existente
router.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, codigo, descricao, preco } = req.body;
  const query = 'UPDATE produtos SET nome = ?, codigo = ?, descricao = ?, preco = ? WHERE id = ?';
  db.query(query, [nome, codigo, descricao, preco, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ id, nome, codigo, descricao, preco });
  });
});

// Delete - Deletar um produto
router.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM produtos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Produto deletado com sucesso' });
  });
});

export default router;