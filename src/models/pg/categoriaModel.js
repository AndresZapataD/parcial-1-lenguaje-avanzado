
import pool from '../../config/db.js';

export const getCategorias = async () => {
  const { rows } = await pool.query('SELECT * FROM categoria ORDER BY id');
  return rows;
};

export const getCategoriaById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM categoria WHERE id = $1', [id]);
  return rows[0];
};

export const createCategoria = async (nombre, descripcion) => {
  const { rows } = await pool.query(
    'INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2) RETURNING *',
    [nombre, descripcion]
  );
  return rows[0];
};

export const updateCategoria = async (id, nombre, descripcion) => {
  const { rows } = await pool.query(
    'UPDATE categoria SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
    [nombre, descripcion, id]
  );
  return rows[0];
};

export const deleteCategoria = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM categoria WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};