import * as dulceModel from '../models/pg/dulceModel.js';
import * as categoriaModel from '../models/pg/categoriaModel.js';
import * as proveedorModel from '../models/pg/proveedorModel.js';
import ResumenTienda from '../models/ResumenTienda.js';

// 🔹 GET ALL
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
        message: 'Todos los campos son requeridos'
      });
    }

    
    if (isNaN(precio) || isNaN(stock)) {
      return res.status(400).json({
        success: false,
        message: 'Precio y stock deben ser números'
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

    const dulce = await dulceModel.createDulce(
      nombre,
      precio,
      stock,
      categoria_id,
      proveedor_id
    );

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

    if (!nombre || !precio || stock === undefined || !categoria_id || !proveedor_id) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    if (isNaN(precio) || isNaN(stock)) {
      return res.status(400).json({
        success: false,
        message: 'Precio y stock deben ser números'
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

    const dulce = await dulceModel.updateDulce(
      id,
      nombre,
      precio,
      stock,
      categoria_id,
      proveedor_id
    );

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

// 🔹 DELETE
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

// 🔥 RESUMEN (REQUERIMIENTO 6)
export const getResumenDulces = async (req, res) => {
  try {
    const dulces = await dulceModel.getDulces();

    const resumen = new ResumenTienda(dulces);

    const masEconomico = resumen.getMasEconomico();
    const masCostoso = resumen.getMasCostoso();

    res.status(200).json({
      totalDulces: dulces.length,
      stockTotal: resumen.getTotalStock(),
      masEconomico: masEconomico
        ? { nombre: masEconomico.nombre, precio: masEconomico.precio }
        : null,
      masCostoso: masCostoso
        ? { nombre: masCostoso.nombre, precio: masCostoso.precio }
        : null
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al generar resumen',
      error: error.message
    });
  }
};