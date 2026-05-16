import express from 'express';
import * as dulceController from '../controllers/dulceController.js';

const router = express.Router();


router.get('/resumen', dulceController.getResumenDulces);


router.get('/', dulceController.getAllDulces);
router.get('/:id', dulceController.getDulceById);
router.post('/', dulceController.createDulce);
router.put('/:id', dulceController.updateDulce);
router.delete('/:id', dulceController.deleteDulce);

export default router;