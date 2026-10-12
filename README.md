# ShipNow API

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar usuarios, productos, tiendas y órdenes dentro del dominio de ShipNow.

Este proyecto corresponde a la **Pre-entrega Módulo 1 — Estructura profesional de ShipNow**, cuyo objetivo principal es refactorizar la API a una arquitectura profesional por capas y centralizar la configuración de entorno.

---

## Objetivo de la pre-entrega

La aplicación fue refactorizada utilizando una arquitectura de tres capas:

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

Cada capa posee una responsabilidad específica:

- **Router:** conecta el endpoint HTTP con el Controller correspondiente.
- **Controller:** recibe `req` y `res`, llama al Service y construye la respuesta HTTP.
- **Service:** contiene la lógica de negocio, validaciones y reglas del dominio.
- **Repository:** encapsula el acceso a MongoDB mediante Mongoose.
- **Model:** define únicamente la estructura de los documentos almacenados en MongoDB.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Nodemon
- JavaScript ES Modules

---

## Arquitectura del proyecto

La estructura principal sigue el patrón solicitado en la consigna:

```text
src/
│
├── config/
│   ├── env.config.js
│   └── index.js
│
├── constants/
│   ├── index.js
│   ├── roles.constants.js
│   ├── product.constants.js
│   └── order.constants.js
│
├── controllers/
│   ├── user.controller.js
│   ├── product.controller.js
│   ├── store.controller.js
│   └── order.controller.js
│
├── errors/
│   └── errorDictionary.js
│
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   ├── store.model.js
│   └── order.model.js
│
├── repositories/
│   ├── user.repository.js
│   ├── product.repository.js
│   ├── store.repository.js
│   └── order.repository.js
│
├── routes/
│   ├── user.router.js
│   ├── product.router.js
│   ├── store.router.js
│   └── order.router.js
│
├── services/
│   ├── user.service.js
│   ├── product.service.js
│   ├── store.service.js
│   └── order.service.js
│
├── validators/
│   ├── user/
│   ├── product/
│   ├── store/
│   └── order/
│
└── utils/
    ├── asyncHandler.js
    ├── createError.js
    └── validateId.js
```

> La estructura puede contener utilidades adicionales según la evolución del proyecto.

---

## Separación entre Service y Repository

Una de las decisiones principales de arquitectura fue separar completamente la lógica de negocio del acceso a datos.

### Repository

El Repository es la única capa que conoce directamente Mongoose y MongoDB.

Ejemplos de responsabilidades:

```javascript
ProductModel.find()
UserModel.findById(id)
StoreModel.findByIdAndUpdate(id, data)
OrderModel.create(data)
```

También puede encapsular decisiones propias de persistencia como:

- proyecciones;
- `populate`;
- filtros;
- ordenamiento;
- consultas específicas;
- uso de `lean()`.

El Repository **no contiene lógica de negocio**.

### Service

El Service contiene las reglas del dominio.

Ejemplos:

- validar que un usuario exista;
- validar IDs;
- normalizar datos;
- evitar operaciones sobre recursos inexistentes;
- calcular el total de una orden;
- asignar el estado inicial de un producto;
- determinar la prioridad o estado de una orden;
- validar que una tienda esté activa antes de crear una orden.

Esto permite que los Controllers permanezcan simples y que el acceso a MongoDB quede desacoplado de las reglas de negocio.

---

## Variables de entorno

La configuración se centraliza en:

```text
src/config/env.config.js
```

La aplicación valida al iniciar que existan las variables obligatorias.

Variables requeridas:

```env
PORT=
MONGODB_URI=
NODE_ENV=
```

El archivo real `.env` **no debe subirse al repositorio**.

El proyecto incluye:

```text
.env.example
```

con las claves necesarias pero sin valores sensibles.

Ejemplo:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Si falta una variable crítica, la aplicación debe lanzar un error descriptivo y detener el proceso antes de iniciar el servidor.

---

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar a la carpeta del proyecto:

```bash
cd shipnow-api
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

---

## Ejecutar el proyecto

Para desarrollo:

```bash
npm run dev
```

Si el proyecto incluye un script de producción:

```bash
npm start
```

El servidor debería iniciar utilizando el puerto definido en:

```env
PORT
```

Ejemplo:

```text
http://localhost:8080
```

---

## Constantes del dominio

Los valores repetidos del dominio se encuentran centralizados mediante objetos inmutables creados con `Object.freeze()`.

### Roles

```javascript
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
});
```

Esto evita utilizar strings mágicos como:

```javascript
role === 'admin'
```

y permite utilizar:

```javascript
role === ROLES.ADMIN
```

### Estados de productos

```javascript
export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: 'available',
    OUT_OF_STOCK: 'out_of_stock'
});
```

El estado del producto puede determinarse desde la capa Service de acuerdo con el stock disponible.

---

## Entidades principales de la Pre-entrega

### Users

La entidad User fue refactorizada siguiendo:

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

Incluye operaciones CRUD y validaciones de negocio.

### Products

La entidad Product utiliza la misma arquitectura:

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

La lógica relacionada con stock y estado permanece en el Service y no en el Repository.

---

## Entidades adicionales

Además de los requisitos obligatorios del Módulo 1, ShipNow incluye entidades adicionales del dominio.

### Stores

Permite administrar tiendas asociadas a un usuario propietario.

El Service valida:

- formato del ID;
- existencia del propietario;
- datos permitidos en una actualización;
- existencia de la tienda.

### Orders

Permite administrar órdenes relacionadas con un customer y una store.

La lógica de negocio incluye:

- validación del customer;
- validación de la store;
- verificación de existencia de las relaciones;
- verificación de tienda activa;
- normalización de items;
- cálculo del total desde el backend;
- asignación de estado inicial;
- asignación de prioridad.

El cliente no debe controlar directamente valores sensibles como el total calculado de una orden.

---

## Endpoints

### Users

```text
POST    /api/users
GET     /api/users
GET     /api/users/:uid
PATCH   /api/users/:uid
DELETE  /api/users/:uid
```

### Products

```text
POST    /api/products
GET     /api/products
GET     /api/products/:pid
PATCH   /api/products/:pid
DELETE  /api/products/:pid
```

### Stores

```text
POST    /api/stores
GET     /api/stores
GET     /api/stores/:sid
PATCH   /api/stores/:sid
DELETE  /api/stores/:sid
```

### Orders

```text
POST    /api/orders
GET     /api/orders
GET     /api/orders/:oid
PATCH   /api/orders/:oid
DELETE  /api/orders/:oid
```

---

## Ejemplo de creación de una orden

```json
{
  "customer": "USER_OBJECT_ID",
  "store": "STORE_OBJECT_ID",
  "items": [
    {
      "name": "Teclado mecánico",
      "quantity": 2,
      "price": 45
    },
    {
      "name": "Mouse gamer",
      "quantity": 1,
      "price": 30
    }
  ],
  "deliveryAddress": "123 Main Street",
  "priority": "normal"
}
```

El cliente no envía el total.

El Service lo calcula:

```text
(2 × 45) + (1 × 30) = 120
```

y almacena la orden con un estado inicial controlado por el backend.

---

## Manejo de errores

El proyecto utiliza un sistema centralizado de errores compuesto por:

```text
errorDictionary
      ↓
createError
      ↓
Service
      ↓
asyncHandler
      ↓
errorHandler
```

Esto permite diferenciar errores como:

```text
INVALID_DATA
INVALID_ID
USER_NOT_FOUND
PRODUCT_NOT_FOUND
STORE_NOT_FOUND
ORDER_NOT_FOUND
```

Los Services detectan condiciones inválidas y lanzan errores del dominio.

Los Controllers no contienen bloques repetitivos de manejo de errores.

---

## Buenas prácticas aplicadas

- Arquitectura Controller → Service → Repository.
- Controllers sin acceso directo a Mongoose.
- Repositories como única capa de acceso a MongoDB.
- Services responsables de la lógica de negocio.
- Routes mínimos.
- Configuración de entorno centralizada.
- Validación de variables críticas al arranque.
- `.env` excluido del repositorio.
- `.env.example` disponible.
- Constantes del dominio centralizadas.
- `Object.freeze()` para valores inmutables.
- Validación reutilizable de ObjectId.
- Manejo centralizado de errores.
- Normalización de datos antes de persistir.
- Uso de `populate()` cuando una entidad referencia otra.
- Uso de `lean()` en consultas de lectura cuando corresponde.
- Uso de `runValidators: true` en actualizaciones.

---

## Seguridad de configuración

Los siguientes archivos o directorios no deben formar parte del repositorio:

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

---

## Prueba de robustez de configuración

Una prueba importante de la pre-entrega consiste en eliminar temporalmente una variable crítica, por ejemplo:

```env
MONGODB_URI
```

Al intentar iniciar la aplicación:

```bash
npm run dev
```

el servidor debe detener el arranque y mostrar un error descriptivo indicando que falta la variable obligatoria.

La aplicación **no debe iniciar** sin la configuración mínima requerida.

---

## Requisitos del Módulo 1 cubiertos

- [x] Carpetas `controllers/`, `services/`, `repositories/`, `models/` y `config/`.
- [x] Arquitectura Controller → Service → Repository.
- [x] Controllers sin imports directos de Mongoose.
- [x] Users refactorizado a tres capas.
- [x] Products refactorizado a tres capas.
- [x] Routes mínimos.
- [x] Configuración centralizada con `dotenv`.
- [x] Variables `PORT`, `MONGODB_URI` y `NODE_ENV`.
- [x] `.env` excluido del repositorio.
- [x] `.env.example`.
- [x] Roles centralizados mediante constantes.
- [x] Estados de Product centralizados.
- [x] Uso de `Object.freeze()`.
- [x] Lógica de negocio ubicada en Services.
- [x] Acceso a MongoDB encapsulado en Repositories.
- [x] Modelos limitados a la definición de esquemas.
- [x] README con instrucciones para ejecutar el proyecto.
- [x] Explicación de separación entre Service y Repository.

---

## Autor

**Terry Leoner Guzman Porras**

GitHub:

```text
https://github.com/terry2315
```

---

## Curso

Proyecto desarrollado como parte de la formación Backend de Coderhouse.

**Pre-entrega Módulo 1 — Estructura profesional de ShipNow**
