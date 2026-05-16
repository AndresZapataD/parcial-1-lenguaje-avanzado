
import * as proveedorModel from '../models/pg/proveedorModel.js';

export const getAllProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorModel.getProveedores();
    res.status(200).json({
      success: true,
      data: proveedores,
      message: 'Proveedores obtenidos correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proveedores',
      error: error.message
    });
  }
};

export const getProveedorById = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await proveedorModel.getProveedorById(id);
    
    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: proveedor,
      message: 'Proveedor obtenido correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el proveedor',
      error: error.message
    });
  }
};

export const createProveedor = async (req, res) => {
  try {
    const { nombre, telefono, ciudad } = req.body;
    
    if (!nombre || !telefono || !ciudad) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, teléfono y ciudad son requeridos'
      });
    }
    
    const proveedor = await proveedorModel.createProveedor(nombre, telefono, ciudad);
    
    res.status(201).json({
      success: true,
      data: proveedor,
      message: 'Proveedor creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el proveedor',
      error: error.message
    });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, ciudad } = req.body;
    
    if (!nombre || !telefono || !ciudad) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre, teléfono y ciudad son requeridos'
      });
    }
    
    const proveedor = await proveedorModel.updateProveedor(id, nombre, telefono, ciudad);
    
    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: proveedor,
      message: 'Proveedor actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el proveedor',
      error: error.message
    });
  }
};

export const deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const proveedor = await proveedorModel.deleteProveedor(id);
    
    if (!proveedor) {
      return res.status(404).json({
        success: false,
        message: 'Proveedor no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: proveedor,
      message: 'Proveedor eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el proveedor',
      error: error.message
    });
  }
};
