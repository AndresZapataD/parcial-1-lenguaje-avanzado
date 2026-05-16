import express from 'express';
import * as proveedorController from '../controllers/proveedorController.js';

const router = express.Router();

router.get('/', proveedorController.getAllProveedores);
router.get('/:id', proveedorController.getProveedorById);
router.post('/', proveedorController.createProveedor);
router.put('/:id', proveedorController.updateProveedor);
router.delete('/:id', proveedorController.deleteProveedor);

export default router;
