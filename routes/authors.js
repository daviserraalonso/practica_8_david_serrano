const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all authors
router.get('/', async (req, res) => {
  try {
    const [authors] = await pool.query('SELECT * FROM authors');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
});

// create a new author
router.post('/', async (req, res) => {
  const { name, email, image } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO authors (name, email, image) VALUES (?, ?, ?)',
      [name, email, image]
    );
    res.status(201).json({ id: result.insertId, name, email, image });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el autor' });
  }
});

module.exports = router;
