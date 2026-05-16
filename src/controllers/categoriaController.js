import * as categoriaModel from '../models/pg/categoriaModel.js';

export const getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.getCategorias();
    res.status(200).json({
      success: true,
      data: categorias,
      message: 'Categorías obtenidas correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message
    });
  }
};

export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaModel.getCategoriaById(id);
    
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: categoria,
      message: 'Categoría obtenida correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la categoría',
      error: error.message
    });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    
    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es requerido'
      });
    }
    
    const categoria = await categoriaModel.createCategoria(nombre, descripcion || null);
    
    res.status(201).json({
      success: true,
      data: categoria,
      message: 'Categoría creada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la categoría',
      error: error.message
    });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    
    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es requerido'
      });
    }
    
    const categoria = await categoriaModel.updateCategoria(id, nombre, descripcion || null);
    
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: categoria,
      message: 'Categoría actualizada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la categoría',
      error: error.message
    });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    
    const categoria = await categoriaModel.deleteCategoria(id);
    
    if (!categoria) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: categoria,
      message: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la categoría',
      error: error.message
    });
  }
};
