import express from 'express';
import * as categoriaController from '../controllers/categoriaController.js';

const router = express.Router();


router.get('/', categoriaController.getAllCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.post('/', categoriaController.createCategoria);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

export default router;
