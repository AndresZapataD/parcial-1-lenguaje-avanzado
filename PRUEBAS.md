# Archivo de Pruebas - Dulcería API

## 1. CREAR CATEGORÍA
POST http://localhost:3000/api/categorias
Content-Type: application/json

{
  "nombre": "Chocolates",
  "descripcion": "Dulces de chocolate artesanal"
}

## Respuesta esperada:
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Chocolates",
    "descripcion": "Dulces de chocolate artesanal",
    "created_at": "2026-05-16T10:30:00.000Z"
  },
  "message": "Categoría creada exitosamente"
}

---

## 2. CREAR OTRA CATEGORÍA
POST http://localhost:3000/api/categorias
Content-Type: application/json

{
  "nombre": "Caramelos",
  "descripcion": "Caramelos duros y blandos"
}

---

## 3. OBTENER TODAS LAS CATEGORÍAS
GET http://localhost:3000/api/categorias

## Respuesta esperada: Array de categorías

---

## 4. OBTENER UNA CATEGORÍA POR ID
GET http://localhost:3000/api/categorias/1

---

## 5. ACTUALIZAR CATEGORÍA
PUT http://localhost:3000/api/categorias/1
Content-Type: application/json

{
  "nombre": "Chocolates Belgas",
  "descripcion": "Chocolate belga de alta calidad"
}

---

## 6. CREAR PROVEEDOR
POST http://localhost:3000/api/proveedores
Content-Type: application/json

{
  "nombre": "Chocolatería del Valle",
  "telefono": "3156789012",
  "ciudad": "Bogotá"
}

## Respuesta esperada:
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Chocolatería del Valle",
    "telefono": "3156789012",
    "ciudad": "Bogotá",
    "created_at": "2026-05-16T10:35:00.000Z"
  },
  "message": "Proveedor creado exitosamente"
}

---

## 7. CREAR OTRO PROVEEDOR
POST http://localhost:3000/api/proveedores
Content-Type: application/json

{
  "nombre": "Dulcería La Esmeralda",
  "telefono": "3167890123",
  "ciudad": "Medellín"
}

---

## 8. OBTENER TODOS LOS PROVEEDORES
GET http://localhost:3000/api/proveedores

---

## 9. OBTENER UN PROVEEDOR POR ID
GET http://localhost:3000/api/proveedores/1

---

## 10. ACTUALIZAR PROVEEDOR
PUT http://localhost:3000/api/proveedores/1
Content-Type: application/json

{
  "nombre": "Chocolatería del Valle Premium",
  "telefono": "3156789012",
  "ciudad": "Bogotá"
}

---

## 11. CREAR DULCE (IMPORTANTE: Usar IDs válidos de categoría y proveedor)
POST http://localhost:3000/api/dulces
Content-Type: application/json

{
  "nombre": "Chocolate Relleno de Café",
  "precio": 8500.50,
  "stock": 100,
  "categoria_id": 1,
  "proveedor_id": 1
}

## Respuesta esperada:
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Chocolate Relleno de Café",
    "precio": "8500.50",
    "stock": 100,
    "categoria_id": 1,
    "proveedor_id": 1,
    "created_at": "2026-05-16T10:40:00.000Z",
    "updated_at": "2026-05-16T10:40:00.000Z"
  },
  "message": "Dulce creado exitosamente"
}

---

## 12. CREAR OTRO DULCE
POST http://localhost:3000/api/dulces
Content-Type: application/json

{
  "nombre": "Caramelo de Menta",
  "precio": 2500.00,
  "stock": 200,
  "categoria_id": 2,
  "proveedor_id": 2
}

---

## 13. OBTENER TODOS LOS DULCES (Con información de categoría y proveedor)
GET http://localhost:3000/api/dulces

## Respuesta esperada:
Array de dulces con datos enriquecidos de categoría y proveedor

---

## 14. OBTENER UN DULCE POR ID
GET http://localhost:3000/api/dulces/1

---

## 15. ACTUALIZAR DULCE
PUT http://localhost:3000/api/dulces/1
Content-Type: application/json

{
  "nombre": "Chocolate Relleno de Café Premium",
  "precio": 9500.00,
  "stock": 150,
  "categoria_id": 1,
  "proveedor_id": 1
}

---

## 16. ELIMINAR UN DULCE
DELETE http://localhost:3000/api/dulces/1

---

## 17. ELIMINAR UN PROVEEDOR
DELETE http://localhost:3000/api/proveedores/1

---

## 18. ELIMINAR UNA CATEGORÍA
DELETE http://localhost:3000/api/categorias/1

---

## NOTAS IMPORTANTES

1. ✅ Primero crea categorías
2. ✅ Luego crea proveedores  
3. ✅ Finalmente crea dulces usando los IDs de categoría y proveedor
4. ✅ Al crear un dulce, asegúrate de que los IDs existan
5. ✅ Puedes actualizar todos los campos de un recurso
6. ✅ Al eliminar, ten cuidado con las dependencias

## PRUEBA CON CURL

```bash
# Crear categoría
curl -X POST http://localhost:3000/api/categorias \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Chocolates","descripcion":"Chocolate artesanal"}'

# Crear proveedor
curl -X POST http://localhost:3000/api/proveedores \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Proveedor XYZ","telefono":"3156789012","ciudad":"Bogotá"}'

# Crear dulce
curl -X POST http://localhost:3000/api/dulces \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Chocolate","precio":5000,"stock":100,"categoria_id":1,"proveedor_id":1}'

# Obtener todos los dulces
curl http://localhost:3000/api/dulces
```
