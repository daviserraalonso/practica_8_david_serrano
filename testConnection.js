const pool = require('./db');

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Conexión exitosa:', rows[0].result);
  } catch (error) {
    console.error('Error en la conexión:', error.message);
  } finally {
    process.exit();
  }
})();
