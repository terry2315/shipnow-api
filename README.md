# ShipNow API

API REST desarrollada con **Node.js**, **Express**, **MongoDB** y **Mongoose**, organizada mediante una arquitectura profesional por capas.

Este README reúne el trabajo correspondiente a:

- **Pre-entrega Módulo 1 — Estructura profesional de ShipNow**
- **Pre-entrega Módulo 2 — Mocking y carga de datos de prueba**
- **Pre-entrega Módulo 3 — Manejo profesional de errores**

---

## Objetivo general

ShipNow fue refactorizado para:

- separar responsabilidades mediante una arquitectura por capas;
- centralizar la configuración de entorno;
- evitar acceso directo a MongoDB desde Controllers;
- centralizar roles, estados y prioridades mediante constantes;
- generar datos simulados coherentes con los modelos reales;
- insertar datos de prueba relacionados en MongoDB;
- centralizar el manejo de errores;
- devolver respuestas HTTP consistentes y predecibles.

El flujo principal de la aplicación es:

```text
Router
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model / MongoDB
```

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- bcrypt
- `@faker-js/faker`
- Nodemon
- JavaScript ES Modules

---

# Arquitectura del proyecto

```text
src/
├── config/
│   ├── env.config.js
│   └── index.js
│
├── constants/
│   ├── index.js
│   ├── roles.constants.js
│   ├── product.constants.js
│   ├── order.constants.js
│   └── delivery.constants.js
│
├── controllers/
│   ├── user.controller.js
│   ├── product.controller.js
│   ├── store.controller.js
│   ├── order.controller.js
│   └── mock.controller.js
│
├── errors/
│   └── errorDictionary.js
│
├── middlewares/
│   ├── errorHandler.middleware.js
│   └── notFound.middleware.js
│
├── mocks/
│   ├── user.mock.js
│   ├── courier.mock.js
│   ├── store.mock.js
│   ├── order.mock.js
│   └── delivery.mock.js
│
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   ├── store.model.js
│   ├── order.model.js
│   └── delivery.model.js
│
├── repositories/
│   ├── user.repository.js
│   ├── product.repository.js
│   ├── store.repository.js
│   ├── order.repository.js
│   └── mock.repository.js
│
├── routes/
│   ├── user.router.js
│   ├── product.router.js
│   ├── store.router.js
│   ├── order.router.js
│   └── mock.router.js
│
├── services/
│   ├── user.service.js
│   ├── product.service.js
│   ├── store.service.js
│   ├── order.service.js
│   └── mock.service.js
│
├── utils/
│   ├── asyncHandler.js
│   ├── createError.js
│   ├── hash.js
│   └── validateId.js
|   
```

> La estructura puede contener archivos auxiliares adicionales según la evolución del proyecto.

---

# Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd shipnow-api
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz tomando como referencia `.env.example`.

Ejemplo:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Ejecutar en desarrollo:

```bash
npm run dev
```

---

# Variables de entorno

La configuración se centraliza en:

```text
src/config/env.config.js
```

Variables requeridas:

```text
PORT
MONGODB_URI
NODE_ENV
```

La aplicación valida las variables al iniciar.

Si falta una variable crítica, por ejemplo:

```text
MONGODB_URI
```

la aplicación debe mostrar un error descriptivo y detener el arranque.

El archivo real `.env` no debe subirse al repositorio.

Se incluye `.env.example` sin valores sensibles.

---

# Módulo 1 — Estructura profesional de ShipNow

## Objetivo

Refactorizar la API base a una arquitectura profesional de tres capas:

```text
Controller → Service → Repository
```

y centralizar la configuración de entorno.

---

## Responsabilidad de cada capa

### Controller

El Controller es la puerta de entrada HTTP.

Responsabilidades:

- recibir `req`;
- extraer `params`, `query` y `body`;
- invocar el Service;
- devolver respuestas exitosas.

No contiene lógica de negocio ni accede a Mongoose directamente.

Ejemplo:

```javascript
export const getUserById = async (req, res) => {
    const { uid } = req.params;

    const user = await getUserByIdService(uid);

    return res.status(200).json({
        status: 'success',
        payload: user
    });
};
```

### Service

Contiene las reglas del dominio.

Ejemplos:

- validar IDs;
- normalizar datos;
- comprobar existencia de entidades;
- validar relaciones;
- calcular totales;
- definir estados;
- validar actualizaciones parciales;
- lanzar errores de dominio.

### Repository

Es la única capa que conoce directamente MongoDB/Mongoose.

Responsabilidades típicas:

- `find`;
- `findById`;
- `findByIdAndUpdate`;
- `findByIdAndDelete`;
- `insertMany`;
- filtros;
- proyecciones;
- `populate`;
- `sort`;
- `lean`.

El Repository no contiene lógica de negocio.

---

## Constantes del dominio

### Roles

```javascript
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    COURIER: 'courier'
});
```

### Estados de Product

```javascript
export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: 'available',
    OUT_OF_STOCK: 'out_of_stock'
});
```

### Estados y prioridad de Order

Los pedidos utilizan:

```text
ORDER_STATUS
ORDER_PRIORITY
```

### Estados de Delivery

Las entregas utilizan:

```text
DELIVERY_STATUS
```

El objetivo es evitar strings mágicos dispersos.

---

## Users

```text
POST    /api/users
GET     /api/users
GET     /api/users/:uid
PATCH   /api/users/:uid
DELETE  /api/users/:uid
```

Flujo:

```text
user.router
   ↓
user.controller
   ↓
user.service
   ↓
user.repository
   ↓
user.model
```

---

## Products

```text
POST    /api/products
GET     /api/products
GET     /api/products/:pid
PATCH   /api/products/:pid
DELETE  /api/products/:pid
```

Flujo:

```text
product.router
   ↓
product.controller
   ↓
product.service
   ↓
product.repository
   ↓
product.model
```

La lógica relacionada con stock y estado permanece en el Service.

---

## Stores

Entidad adicional del dominio:

```text
POST    /api/stores
GET     /api/stores
GET     /api/stores/:sid
PATCH   /api/stores/:sid
DELETE  /api/stores/:sid
```

Se valida:

- ID de Store;
- existencia del owner;
- actualización parcial;
- `isActive`;
- `STORE_NOT_FOUND`;
- `USER_NOT_FOUND`.

---

## Orders

```text
POST    /api/orders
GET     /api/orders
GET     /api/orders/:oid
PATCH   /api/orders/:oid
DELETE  /api/orders/:oid
```

El backend controla reglas como:

- existencia de `customer`;
- existencia de `store`;
- tienda activa;
- validación de items;
- cálculo del total;
- status inicial;
- prioridad permitida.

El cliente no controla directamente el total calculado del pedido.

---

# Módulo 2 — Mocking y carga de datos de prueba

## Objetivo

Generar datos simulados de:

```text
Users
Couriers
Orders
Deliveries
```

sin depender de carga manual y manteniendo relaciones coherentes con los modelos reales.

Se utiliza:

```text
@faker-js/faker
```

---

## Arquitectura de mocks

```text
/api/mocks
   ↓
mock.router.js
   ↓
mock.controller.js
   ↓
mock.service.js
   ↓
mock.repository.js
   ↓
MongoDB
```

Generadores:

```text
src/mocks/
├── user.mock.js
├── courier.mock.js
├── store.mock.js
├── order.mock.js
└── delivery.mock.js
```

---

## Endpoints sin persistencia

### Usuarios

```http
GET /api/mocks/users?qty=3
```

Ejemplo:

```json
{
  "status": "success",
  "quantity": 3,
  "payload": [
    {
      "_id": "dcef01b23af92eaaccdbfdd2",
      "firstName": "Patti",
      "lastName": "Little",
      "email": "patti.little98.krsxy7@yahoo.com",
      "role": "user",
      "documents": []
    }
  ]
}
```

La contraseña no se expone.

### Couriers

```http
GET /api/mocks/couriers?qty=3
```

Los registros utilizan:

```text
role = courier
```

### Orders

```http
GET /api/mocks/orders?qty=3
```

Ejemplo:

```json
{
  "status": "success",
  "quantity": 3,
  "payload": [
    {
      "customer": "bdb617ad1dfb07d4f3bbed03",
      "store": "a1c6feeec3ecedf59ae2ae8d",
      "items": [
        {
          "name": "Sleek Metal Soap",
          "quantity": 1,
          "price": 175.74
        }
      ],
      "deliveryAddress": "42017 Luigi Burg",
      "total": 175.74,
      "status": "delivered",
      "priority": "normal"
    }
  ]
}
```

El total se calcula a partir de:

```text
price × quantity
```

### Deliveries

```http
GET /api/mocks/deliveries?qty=3
```

Ejemplo:

```json
{
  "status": "success",
  "quantity": 3,
  "payload": [
    {
      "order": "e7e72a47b1d4beb1f06b586e",
      "courier": "ba89dd7c0e190bb548e0eeea",
      "status": "assigned",
      "assignedAt": "2026-10-12T08:27:44.629Z",
      "deliveredAt": null
    }
  ]
}
```

Reglas básicas:

```text
pending
→ courier = null
→ assignedAt = null
→ deliveredAt = null

assigned / picked_up / in_transit
→ courier = ObjectId
→ assignedAt = Date
→ deliveredAt = null

delivered
→ courier = ObjectId
→ assignedAt = Date
→ deliveredAt = Date
```

---

## Seed en MongoDB

```http
POST /api/mocks/seed?qty=3
```

No necesita body.

Ejemplo:

```json
{
  "status": "success",
  "message": "Datos de prueba insertados exitosamente",
  "payload": {
    "users": 3,
    "couriers": 3,
    "stores": 1,
    "orders": 3,
    "deliveries": 3
  }
}
```

Con `qty=3` se generan:

```text
3 users
3 couriers
1 store auxiliar
3 orders
3 deliveries
```

---

## Relaciones del seed

Las entidades se insertan en un orden controlado:

```text
Users + Couriers
       ↓
      IDs
       ↓
Stores
       ↓
      IDs
       ↓
Orders
       ↓
      IDs
       ↓
Deliveries
```

Relaciones persistidas:

```text
Store.owner
→ User existente

Order.customer
→ User existente

Order.store
→ Store existente

Delivery.order
→ Order existente

Delivery.courier
→ User con role = courier
```

Los IDs utilizados durante la persistencia son los `_id` reales devueltos por MongoDB.

---

## Sincronización Order ↔ Delivery

```text
ORDER                  DELIVERY

created          →     pending
assigned         →     assigned
picked_up        →     picked_up
in_transit       →     in_transit
delivered        →     delivered
cancelled        →     cancelled
```

---

## Passwords de mocks

Antes de persistir Users y Couriers:

```text
password generada
      ↓
passwordHash()
      ↓
bcrypt
      ↓
MongoDB
```

No se almacenan passwords en texto plano.

---

## Parámetro `qty`

Rango permitido:

```text
1 a 100
```

Valor por defecto:

```text
10
```

Ejemplo:

```http
GET /api/mocks/users
```

genera 10 usuarios.

Casos inválidos:

```text
qty=0
qty=-1
qty=abc
qty=101
```

---

# Módulo 3 — Manejo profesional de errores

## Objetivo

Centralizar el manejo de errores para evitar respuestas aisladas en Routes o Controllers.

Flujo:

```text
Request
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
throw createError(...)
   ↓
asyncHandler
   ↓
errorHandler
   ↓
HTTP Response
```

Los Services detectan errores de negocio.

El middleware global construye la respuesta HTTP.

---

## Diccionario de errores

Archivo:

```text
src/errors/errorDictionary.js
```

Casos utilizados o previstos por el dominio:

```text
INVALID_DATA
INVALID_ID
USER_NOT_FOUND
USER_ALREADY_EXISTS
PRODUCT_NOT_FOUND
STORE_NOT_FOUND
ORDER_NOT_FOUND
INVALID_ORDER_STATUS
INVALID_ORDER_PRIORITY
INVALID_MOCK_QUANTITY
MOCK_SEED_FAILED
ROUTE_NOT_FOUND
INTERNAL_SERVER_ERROR
```

Ejemplo:

```javascript
INVALID_ID: {
    code: 'INVALID_ID',
    statusCode: 400,
    message: 'El identificador proporcionado es inválido'
}
```

---

## Errores personalizados

La aplicación utiliza una fábrica común:

```text
src/utils/createError.js
```

Ejemplo:

```javascript
throw createError(
    ERROR_DICTIONARY.USER_NOT_FOUND
);
```

Con detalles:

```javascript
throw createError({
    ...ERROR_DICTIONARY.INVALID_DATA,
    details: {
        email: 'Formato inválido'
    }
});
```

---

## asyncHandler

Los Controllers asíncronos se envuelven con:

```javascript
asyncHandler(controller)
```

Ejemplo:

```javascript
router.get(
    '/:uid',
    asyncHandler(getUserById)
);
```

Esto permite enviar errores al middleware global sin repetir `try/catch`.

---

## Middleware global de errores

Formato uniforme:

```json
{
  "status": "error",
  "code": "INVALID_DATA",
  "message": "Los datos proporcionados son inválidos",
  "details": {
    "campo": "Descripción del problema"
  }
}
```

Cuando no existen detalles:

```json
{
  "status": "error",
  "code": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}
```

Para errores inesperados:

```json
{
  "status": "error",
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Error interno del servidor"
}
```

---

## Ruta inexistente

Ejemplo:

```http
GET /api/no-existe
```

Respuesta esperada:

```json
{
  "status": "error",
  "code": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}
```

HTTP:

```text
404
```

---

## Errores de dominio

### ID inválido

```http
GET /api/users/123
```

Esperado:

```text
400 INVALID_ID
```

### Usuario inexistente

```http
GET /api/users/000000000000000000000001
```

Esperado:

```text
404 USER_NOT_FOUND
```

### Producto inexistente

```text
404 PRODUCT_NOT_FOUND
```

### Store inexistente

```text
404 STORE_NOT_FOUND
```

### Order inexistente

```text
404 ORDER_NOT_FOUND
```

---

## Errores del módulo de mocks

Ejemplos:

```http
GET /api/mocks/users?qty=0
GET /api/mocks/users?qty=-1
GET /api/mocks/users?qty=abc
GET /api/mocks/users?qty=101
```

Respuesta uniforme esperada:

```json
{
  "status": "error",
  "code": "INVALID_MOCK_QUANTITY",
  "message": "La cantidad de datos de prueba es inválida",
  "details": {
    "qty": "La cantidad debe ser un número entero entre 1 y 100"
  }
}
```

HTTP:

```text
400
```

---

## Fallos durante el seed

Los fallos inesperados durante la persistencia de mocks deben convertirse en un error controlado:

```text
MOCK_SEED_FAILED
```

Ejemplo:

```json
{
  "status": "error",
  "code": "MOCK_SEED_FAILED",
  "message": "No fue posible insertar los datos de prueba"
}
```

Los errores de dominio ya conocidos deben conservar su identidad y no transformarse innecesariamente.

---

# Resumen de endpoints

## Users

```text
POST    /api/users
GET     /api/users
GET     /api/users/:uid
PATCH   /api/users/:uid
DELETE  /api/users/:uid
```

## Products

```text
POST    /api/products
GET     /api/products
GET     /api/products/:pid
PATCH   /api/products/:pid
DELETE  /api/products/:pid
```

## Stores

```text
POST    /api/stores
GET     /api/stores
GET     /api/stores/:sid
PATCH   /api/stores/:sid
DELETE  /api/stores/:sid
```

## Orders

```text
POST    /api/orders
GET     /api/orders
GET     /api/orders/:oid
PATCH   /api/orders/:oid
DELETE  /api/orders/:oid
```

## Mocks

```text
GET   /api/mocks/users?qty=3
GET   /api/mocks/couriers?qty=3
GET   /api/mocks/orders?qty=3
GET   /api/mocks/deliveries?qty=3
POST  /api/mocks/seed?qty=3
```

---

# Pruebas realizadas

## Módulo 1

```text
CRUD Users                      ✅
CRUD Products                   ✅
CRUD Stores                     ✅
CRUD Orders                     ✅
INVALID_ID                      ✅
*_NOT_FOUND                     ✅
PATCH parcial                   ✅
```

## Módulo 2

```text
GET /api/mocks/users?qty=1          ✅
GET /api/mocks/users                ✅ default 10
GET /api/mocks/couriers?qty=3       ✅
GET /api/mocks/orders?qty=3         ✅
GET /api/mocks/deliveries?qty=3     ✅
POST /api/mocks/seed?qty=3          ✅

qty=0                               ✅ 400
qty=-1                              ✅ 400
qty=abc                             ✅ 400
qty=101                             ✅ 400
```

MongoDB:

```text
users creados                   ✅
couriers creados                ✅
roles correctos                 ✅
passwords hasheados             ✅
stores creadas                  ✅
orders creadas                  ✅
deliveries creadas              ✅
relaciones ObjectId             ✅
Order ↔ Delivery coherentes     ✅
```

## Módulo 3 — pruebas finales

```text
GET /api/users/123
→ 400 INVALID_ID

GET /api/users/<ObjectId inexistente>
→ 404 USER_NOT_FOUND

GET /api/products/<ObjectId inexistente>
→ 404 PRODUCT_NOT_FOUND

GET /api/stores/<ObjectId inexistente>
→ 404 STORE_NOT_FOUND

GET /api/orders/<ObjectId inexistente>
→ 404 ORDER_NOT_FOUND

GET /api/mocks/users?qty=0
→ 400 INVALID_MOCK_QUANTITY

GET /api/mocks/users?qty=abc
→ 400 INVALID_MOCK_QUANTITY

GET /api/no-existe
→ 404 ROUTE_NOT_FOUND
```

---

# Seguridad y Git

No deben subirse:

```text
.env
node_modules/
logs/
```

Ejemplo de `.gitignore`:

```gitignore
node_modules/
.env
logs/
```

Antes de hacer push:

```bash
git status
```

Verificar que `.env` y `node_modules` no aparezcan entre los archivos a subir.

---

# Checklist Módulo 1

- [x] Arquitectura Controller → Service → Repository.
- [x] Carpetas `controllers/`, `services/`, `repositories/`, `models/` y `config/`.
- [x] Controllers sin acceso directo a Mongoose.
- [x] Users refactorizado.
- [x] Products refactorizado.
- [x] Routes mínimos.
- [x] Configuración centralizada.
- [x] Validación de `PORT`, `MONGODB_URI` y `NODE_ENV`.
- [x] `.env` excluido.
- [x] `.env.example`.
- [x] Roles mediante constantes.
- [x] Estados mediante constantes.
- [x] Uso de `Object.freeze()`.
- [x] Separación clara entre Service y Repository.

---

# Checklist Módulo 2

- [x] Router `/api/mocks`.
- [x] Arquitectura por capas.
- [x] Mock de Users.
- [x] Mock de Couriers.
- [x] Mock de Orders.
- [x] Mock de Deliveries.
- [x] Endpoints sin persistencia.
- [x] Seed controlado.
- [x] Relaciones reales mediante ObjectId.
- [x] Roles válidos.
- [x] Estados y prioridades válidos.
- [x] Passwords hasheados.
- [x] Validación de `qty`.
- [x] Sincronización Order ↔ Delivery.

---

# Checklist Módulo 3

- [x] Fábrica de errores personalizados.
- [x] Diccionario centralizado.
- [x] Middleware global de errores.
- [x] `asyncHandler`.
- [x] Errores detectados principalmente desde Services.
- [x] Formato uniforme de respuesta.
- [x] Mocks integrados al sistema de errores.
- [x] Validación controlada de cantidades inválidas.
- [ ] Confirmar auditoría final de Controllers y Routes.
- [ ] Confirmar manejo controlado de fallo de seed/MongoDB.
- [ ] Ejecutar pruebas finales antes de entregar.

---

# Commits sugeridos

Módulo 1:

```bash
git commit -m "feat: complete module 1 layered architecture"
```

Módulo 2:

```bash
git commit -m "feat: complete module 2 mocking and seed system"
```

Módulo 3:

```bash
git commit -m "feat: complete module 3 centralized error handling"
```

---

# Autor

**Terry Leoner Guzman Porras**

GitHub:

```text
https://github.com/terry2315
```

---

# Curso

Proyecto desarrollado como parte de la formación Backend de Coderhouse.

Incluye:

```text
Pre-entrega Módulo 1 — Estructura profesional de ShipNow
Pre-entrega Módulo 2 — Mocking y carga de datos de prueba
Pre-entrega Módulo 3 — Manejo profesional de errores
```
