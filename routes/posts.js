const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all post by author
router.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT 
        posts.*, 
        authors.name AS author_name, 
        authors.email AS author_email, 
        authors.image AS author_image 
      FROM posts
      JOIN authors ON posts.author_id = authors.id
    `);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// create a new post
router.post('/', async (req, res) => {
  const { title, description, creation_date, category, author_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, description, creation_date, category, author_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, creation_date, category, author_id]
    );
    res.status(201).json({ id: result.insertId, title, description, creation_date, category, author_id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

// get all pot by author
router.get('/:authorId', async (req, res) => {
  const { authorId } = req.params;
  try {
    const [posts] = await pool.query(
      `
      SELECT 
        posts.*, 
        authors.name AS author_name, 
        authors.email AS author_email, 
        authors.image AS author_image 
      FROM posts
      JOIN authors ON posts.author_id = authors.id
      WHERE posts.author_id = ?
      `,
      [authorId]
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts del autor' });
  }
});

module.exports = router;
