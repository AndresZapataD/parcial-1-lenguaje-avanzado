import pool from '../../config/db.js';

export const getDulces = async () => {
  const { rows } = await pool.query(`
    SELECT 
      d.id,
      d.nombre,
      d.precio,
      d.stock,
      c.id AS categoria_id,
      c.nombre AS categoria_nombre,
      p.id AS proveedor_id,
      p.nombre AS proveedor_nombre
    FROM dulce d
    LEFT JOIN categoria c ON d.categoria_id = c.id
    LEFT JOIN proveedor p ON d.proveedor_id = p.id
    ORDER BY d.id
  `);
  return rows;
};

export const getDulceById = async (id) => {
  const { rows } = await pool.query(`
    SELECT 
      d.id,
      d.nombre,
      d.precio,
      d.stock,
      c.id AS categoria_id,
      c.nombre AS categoria_nombre,
      p.id AS proveedor_id,
      p.nombre AS proveedor_nombre
    FROM dulce d
    LEFT JOIN categoria c ON d.categoria_id = c.id
    LEFT JOIN proveedor p ON d.proveedor_id = p.id
    WHERE d.id = $1
  `, [id]);
  return rows[0];
};

export const createDulce = async (nombre, precio, stock, categoria_id, proveedor_id) => {
  const { rows } = await pool.query(
    `INSERT INTO dulce (nombre, precio, stock, categoria_id, proveedor_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, precio, stock, categoria_id, proveedor_id]
  );
  return rows[0];
};

export const updateDulce = async (id, nombre, precio, stock, categoria_id, proveedor_id) => {
  const { rows } = await pool.query(
    `UPDATE dulce SET nombre = $1, precio = $2, stock = $3, categoria_id = $4, proveedor_id = $5 
     WHERE id = $6 RETURNING *`,
    [nombre, precio, stock, categoria_id, proveedor_id, id]
  );
  return rows[0];
};

export const deleteDulce = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM dulce WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};