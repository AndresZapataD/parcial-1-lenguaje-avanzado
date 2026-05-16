import pool from '../../config/db.js';

export const getProveedores = async () => {
  const { rows } = await pool.query('SELECT * FROM proveedor ORDER BY id');
  return rows;
};

export const getProveedorById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM proveedor WHERE id = $1', [id]);
  return rows[0];
};

export const createProveedor = async (nombre, telefono, ciudad) => {
  const { rows } = await pool.query(
    'INSERT INTO proveedor (nombre, telefono, ciudad) VALUES ($1, $2, $3) RETURNING *',
    [nombre, telefono, ciudad]
  );
  return rows[0];
};

export const updateProveedor = async (id, nombre, telefono, ciudad) => {
  const { rows } = await pool.query(
    'UPDATE proveedor SET nombre = $1, telefono = $2, ciudad = $3 WHERE id = $4 RETURNING *',
    [nombre, telefono, ciudad, id]
  );
  return rows[0];
};

export const deleteProveedor = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM proveedor WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};