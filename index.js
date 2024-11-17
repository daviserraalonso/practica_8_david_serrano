const express = require('express');
const app = express();
const authorsRoutes = require('./routes/authors');
const postsRoutes = require('./routes/posts');

// Middleware para parsear JSON
app.use(express.json());

// Rutas API
app.use('/api/authors', authorsRoutes);
app.use('/api/posts', postsRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
