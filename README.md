# ShipNow API

API REST desarrollada con **Node.js**, **Express**, **MongoDB** y **Mongoose**, organizada mediante una arquitectura profesional por capas.

Este README consolida el trabajo correspondiente a:

- **Pre-entrega Módulo 1 — Estructura profesional de ShipNow**
- **Pre-entrega Módulo 2 — Mocking y carga de datos de prueba**
- **Pre-entrega Módulo 3 — Manejo profesional de errores**
- **Pre-entrega Módulo 4 — Logging y monitoreo básico**

---

## Objetivo general

ShipNow fue refactorizado para separar responsabilidades, centralizar la configuración, generar datos de prueba relacionados, manejar errores de forma uniforme y registrar eventos importantes mediante un sistema profesional de logging.

Flujo principal:

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

Capas transversales:

```text
Environment Config
Error Handler
Request Logger
Winston Logger
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
- Winston
- `winston-daily-rotate-file`
- Nodemon
- JavaScript ES Modules

---

# Arquitectura del proyecto

```text
src/
├── config/
│   ├── env.config.js
│   ├── logger.config.js
│   └── db.config.js
├── constants/
├── controllers/
├── errors/
├── middlewares/
│   ├── errorHandler.middleware.js
│   ├── notFound.middleware.js
│   └── requestLogger.middleware.js
├── mocks/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js
```

---

# Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd shipnow-api
npm install
```

Crear `.env` usando `.env.example` como referencia:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

Ejecutar:

```bash
npm run dev
```

---

# Módulo 1 — Estructura profesional de ShipNow

## Objetivo

Refactorizar la API utilizando:

```text
Controller → Service → Repository
```

y centralizar la configuración de entorno.

### Controller

- recibe `req`;
- extrae `params`, `query` y `body`;
- invoca al Service;
- devuelve respuestas exitosas;
- no contiene lógica de negocio;
- no accede directamente a Mongoose.

### Service

Contiene:

- validaciones;
- normalización;
- reglas del dominio;
- comprobación de entidades;
- relaciones;
- cálculo de totales;
- estados;
- prioridades;
- errores del dominio.

### Repository

Es la capa que conoce MongoDB/Mongoose.

Puede utilizar:

```text
find
findById
findByIdAndUpdate
findByIdAndDelete
insertMany
populate
sort
lean
```

---

## Variables de entorno

Se centralizan variables como:

```text
PORT
MONGODB_URI
NODE_ENV
```

El archivo `.env` no se sube al repositorio.

---

## Constantes

### Roles

```javascript
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    COURIER: 'courier'
});
```

### Product

```javascript
export const PRODUCT_STATUS = Object.freeze({
    AVAILABLE: 'available',
    OUT_OF_STOCK: 'out_of_stock'
});
```

Además se utilizan:

```text
ORDER_STATUS
ORDER_PRIORITY
DELIVERY_STATUS
```

para evitar strings mágicos.

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

# Módulo 2 — Mocking y carga de datos de prueba

## Objetivo

Generar datos simulados mediante `@faker-js/faker` para:

```text
Users
Couriers
Orders
Deliveries
```

---

## Endpoints sin persistencia

```text
GET /api/mocks/users?qty=3
GET /api/mocks/couriers?qty=3
GET /api/mocks/orders?qty=3
GET /api/mocks/deliveries?qty=3
```

Estos endpoints no guardan datos en MongoDB.

---

## Seed

```http
POST /api/mocks/seed?qty=3
```

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

---

## Relaciones del seed

```text
Users + Couriers
       ↓
Stores
       ↓
Orders
       ↓
Deliveries
```

Relaciones:

```text
Store.owner → User
Order.customer → User
Order.store → Store
Delivery.order → Order
Delivery.courier → User con role courier
```

Los `_id` persistidos provienen de MongoDB.

---

## Sincronización Order ↔ Delivery

```text
created       → pending
assigned      → assigned
picked_up     → picked_up
in_transit    → in_transit
delivered     → delivered
cancelled     → cancelled
```

---

## Passwords

Los usuarios mock que se persisten pasan por:

```text
password mock
   ↓
passwordHash()
   ↓
bcrypt
   ↓
MongoDB
```

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

Centralizar las respuestas de error.

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

---

## Diccionario de errores

Ejemplos:

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

---

## Formato uniforme

Ejemplo:

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

Para errores inesperados:

```json
{
  "status": "error",
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Error interno del servidor"
}
```

---

# Módulo 4 — Logging y monitoreo básico

## Objetivo

Incorporar un sistema profesional de logging con **Winston**, integrado con la arquitectura y el manejo de errores existente.

Se utiliza:

```text
winston
winston-daily-rotate-file
```

---

## Niveles personalizados

```javascript
const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
};
```

Niveles:

```text
debug
http
info
warning
error
fatal
```

---

## Uso de niveles

```text
debug
→ información detallada de desarrollo

http
→ peticiones HTTP

info
→ eventos exitosos importantes

warning
→ errores esperados o situaciones anormales controladas

error
→ fallos técnicos o inesperados

fatal
→ fallas críticas de arranque o infraestructura
```

---

## Formato

Cada log incluye:

```text
timestamp + nivel + mensaje
```

Ejemplo:

```text
2026-10-17 11:23:46 [info] Conexión a MongoDB establecida correctamente
2026-10-17 11:23:46 [info] Servidor ShipNow escuchando en el puerto 8080
2026-10-17 11:26:00 [warning] INVALID_MOCK_QUANTITY - La cantidad de datos de prueba es inválida
```

---

## Development

Con:

```env
NODE_ENV=development
```

se muestran:

```text
debug
http
info
warning
error
fatal
```

---

## Production

Con:

```env
NODE_ENV=production
```

se muestran:

```text
info
warning
error
fatal
```

No se muestran:

```text
debug
http
```

La prueba se realizó con:

```bash
NODE_ENV=production npm run dev
```

y el comportamiento fue verificado.

---

## MongoDB

Conexión correcta:

```text
[info] Conexión a MongoDB establecida correctamente
```

Fallo crítico:

```text
[fatal] Error al conectar con MongoDB: ...
```

---

## Servidor

Inicio correcto:

```text
[info] Servidor ShipNow escuchando en el puerto 8080
```

Los errores críticos de arranque se registran como `fatal`.

---

## Request logger

Archivo:

```text
src/middlewares/requestLogger.middleware.js
```

Ejemplos:

```text
[http] GET /api/logger-test 200 - 4ms
[http] GET /api/mocks/users?qty=-1 400 - 2ms
```

Registra:

```text
método HTTP
ruta
status
duración
```

---

## Integración con errorHandler

Los errores esperados 4xx se registran como:

```text
warning
```

Ejemplo:

```text
[warning] INVALID_MOCK_QUANTITY - La cantidad de datos de prueba es inválida - GET /api/mocks/users?qty=-1
```

Los errores inesperados o de servidor se registran como:

```text
error
```

Las fallas críticas de inicio se registran como:

```text
fatal
```

---

## Logging en mocks

Generación simple:

```text
debug
```

Ejemplo:

```text
[debug] Generando 10 usuarios mock
```

Seed iniciado:

```text
[info] Iniciando seed de 3 registros
```

Seed completado:

```text
[info] Seed completado: 3 users, 3 couriers, 1 stores, 3 orders y 3 deliveries
```

Fallo técnico de seed:

```text
error
```

---

## Logging de Orders

Después de que el Repository confirma la creación:

```text
[info] Pedido creado correctamente: <orderId>
```

Esto evita registrar una creación exitosa antes de confirmar la persistencia.

---

## Endpoint de prueba

```http
GET /api/logger-test
```

Respuesta:

```json
{
  "status": "success",
  "message": "Todos los niveles del logger fueron ejecutados"
}
```

En development genera:

```text
debug
http
info
warning
error
fatal
```

En production no muestra `debug` ni `http`.

---

## Persistencia de logs

Los niveles:

```text
error
fatal
```

se guardan en:

```text
logs/error-YYYY-MM-DD.log
```

No se guardan allí:

```text
debug
http
info
warning
```

---

## Rotación

Se utiliza `winston-daily-rotate-file`.

La configuración permite:

- rotación por fecha;
- limitar tamaño;
- limitar días conservados;
- compresión de archivos antiguos;
- mantener un audit file de control.

---

## Gitignore

```gitignore
node_modules
.env
logs/
uploads
coverage
npm-debug.log
```

Los archivos de logs generados localmente no se suben al repositorio.

---

## Auditoría de console.*

Se ejecutó:

```bash
grep -RIn "console\." src
```

No quedaron usos de:

```text
console.log
console.error
console.warn
console.info
```

Los mensajes relevantes fueron reemplazados por Winston.

---

# Pruebas realizadas

## Logger test en development

```http
GET /api/logger-test
```

Comprobado:

```text
debug      ✅
http       ✅
info       ✅
warning    ✅
error      ✅
fatal      ✅
```

## Archivo de errores

Comprobado:

```text
error      ✅ persistido
fatal      ✅ persistido
warning    ❌ no persistido
info       ❌ no persistido
http       ❌ no persistido
debug      ❌ no persistido
```

## Error de mocks

```http
GET /api/mocks/users?qty=-1
```

Resultado:

```text
400 INVALID_MOCK_QUANTITY
```

Con logs:

```text
[warning] INVALID_MOCK_QUANTITY ...
[http] GET /api/mocks/users?qty=-1 400 - 2ms
```

El warning no se guarda en `error.log`.

## Production

Comprobado:

```text
info       ✅
warning    ✅
error      ✅
fatal      ✅
debug      ❌
http       ❌
```

---

# Checklist Módulo 1

- [x] Arquitectura Controller → Service → Repository.
- [x] Configuración centralizada.
- [x] Users refactorizado.
- [x] Products refactorizado.
- [x] Constantes del dominio.
- [x] `.env.example`.
- [x] `.env` ignorado.

# Checklist Módulo 2

- [x] Mock Users.
- [x] Mock Couriers.
- [x] Mock Orders.
- [x] Mock Deliveries.
- [x] Seed controlado.
- [x] Relaciones ObjectId.
- [x] Passwords hasheados.
- [x] Validación de `qty`.
- [x] Order ↔ Delivery sincronizados.

# Checklist Módulo 3

- [x] Errores personalizados.
- [x] Diccionario centralizado.
- [x] Middleware global.
- [x] `asyncHandler`.
- [x] Formato uniforme.
- [x] Mocks integrados.
- [x] `INVALID_MOCK_QUANTITY`.
- [x] `MOCK_SEED_FAILED`.

# Checklist Módulo 4

- [x] Winston.
- [x] Logger centralizado.
- [x] `debug`.
- [x] `http`.
- [x] `info`.
- [x] `warning`.
- [x] `error`.
- [x] `fatal`.
- [x] Development y production diferenciados.
- [x] MongoDB integrado.
- [x] Server integrado.
- [x] ErrorHandler integrado.
- [x] Mocks integrados.
- [x] Request logger.
- [x] `/api/logger-test`.
- [x] Persistencia de `error` y `fatal`.
- [x] Rotación.
- [x] `logs/` ignorado.
- [x] Auditoría de `console.*`.
- [x] README actualizado.

---

# Commits sugeridos

```bash
git commit -m "feat: complete module 1 layered architecture"
git commit -m "feat: complete module 2 mocking and seed system"
git commit -m "feat: complete module 3 centralized error handling"
git commit -m "feat: complete module 4 logging and monitoring"
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

Incluye las pre-entregas de los módulos 1, 2, 3 y 4 de ShipNow API.
