import * as dulceModel from '../models/pg/dulceModel.js';
import * as categoriaModel from '../models/pg/categoriaModel.js';
import * as proveedorModel from '../models/pg/proveedorModel.js';

export const getAllDulces = async (req, res) => {
  try {
    const dulces = await dulceModel.getDulces();
    res.status(200).json({
      success: true,
      data: dulces,
      message: 'Dulces obtenidos correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener dulces',
      error: error.message
    });
  }
};

export const getDulceById = async (req, res) => {
  try {
    const { id } = req.params;
    const dulce = await dulceModel.getDulceById(id);
    
    if (!dulce) {
      return res.status(404).json({
        success: false,
        message: 'Dulce no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: dulce,
      message: 'Dulce obtenido correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el dulce',
      error: error.message
    });
  }
};

export const createDulce = async (req, res) => {
  try {
    const { nombre, precio, stock, categoria_id, proveedor_id } = req.body;
    
    // Validaciones
    if (!nombre || !precio || stock === undefined || !categoria_id || !proveedor_id) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, precio, stock, categoria_id y proveedor_id son requeridos'
      });
    }
    
    // Validar que la categoría existe
    const categoria = await categoriaModel.getCategoriaById(categoria_id);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    const proveedor = await proveedorModel.getProveedorById(proveedor_id);
    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }
    
    const dulce = await dulceModel.createDulce(nombre, precio, stock, categoria_id, proveedor_id);
    
    res.status(201).json({
      success: true,
      data: dulce,
      message: 'Dulce creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el dulce',
      error: error.message
    });
  }
};

export const updateDulce = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, categoria_id, proveedor_id } = req.body;
    
    // Validaciones
    if (!nombre || !precio || stock === undefined || !categoria_id || !proveedor_id) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, precio, stock, categoria_id y proveedor_id son requeridos'
      });
    }
    
    
    const categoria = await categoriaModel.getCategoriaById(categoria_id);
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    
    const proveedor = await proveedorModel.getProveedorById(proveedor_id);
    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }
    
    const dulce = await dulceModel.updateDulce(id, nombre, precio, stock, categoria_id, proveedor_id);
    
    if (!dulce) {
      return res.status(404).json({
        success: false,
        message: 'Dulce no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: dulce,
      message: 'Dulce actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el dulce',
      error: error.message
    });
  }
};

export const deleteDulce = async (req, res) => {
  try {
    const { id } = req.params;
    
    const dulce = await dulceModel.deleteDulce(id);
    
    if (!dulce) {
      return res.status(404).json({
        success: false,
        message: 'Dulce no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: dulce,
      message: 'Dulce eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el dulce',
      error: error.message
    });
  }
};
