import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Conexión inicial sin BD específica
const initialPool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: 'postgres'
});

// SQL para crear las tablas
const createTablesSQL = `
  CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS proveedor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS dulce (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    stock INTEGER DEFAULT 0,
    categoria_id INTEGER REFERENCES categoria(id) ON DELETE CASCADE,
    proveedor_id INTEGER REFERENCES proveedor(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_dulce_categoria ON dulce(categoria_id);
  CREATE INDEX IF NOT EXISTS idx_dulce_proveedor ON dulce(proveedor_id);
`;

const initializeDatabase = async () => {
  const client = await initialPool.connect();

  try {
    console.log(' Inicializando base de datos...');


    const dbCheckResult = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME]
    );

    if (dbCheckResult.rows.length === 0) {
      console.log(`📦 Creando base de datos '${process.env.DB_NAME}'...`);
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(` Base de datos creada`);
    } else {
      console.log(` Base de datos ya existe`);
    }

    client.release();

    const mainPool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    const mainClient = await mainPool.connect();

    await mainClient.query(createTablesSQL);


    const tableCheck = await mainClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);


    mainClient.release();
    await mainPool.end();

  } catch (error) {
    console.error(' Error inicializando DB:', error.message);
    throw error;
  } finally {
    await initialPool.end();
  }
};

export default initializeDatabase;