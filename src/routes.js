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
router.put('/produtos/:codigo', (req, res) => {
    console.log(req.params);
    const { codigo } = req.params;
    const { nome, descricao, preco } = req.body;
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE codigo = ?';
    db.query(query, [nome, descricao, preco, codigo], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send({ codigo, nome, descricao, preco });
    });
  });

// Delete - Deletar um produto
router.delete('/produtos/:codigo', (req, res) => {
    console.log(req.params);   
    const { codigo } = req.params;
    const query = 'DELETE FROM produtos WHERE codigo = ?';
  
    db.query(query, [codigo], (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Produto deletado com sucesso' });
    });
    
  

   
  
  });

export default router;