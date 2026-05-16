import express from 'express';
import dotenv from 'dotenv';
import initializeDatabase from './config/initdb.js';


import categoriaRoutes from './routes/categoriaRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import dulceRoutes from './routes/dulceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.use('/api/categorias', categoriaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/dulces', dulceRoutes);

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor', error);
  }
};

startServer();