# ShipNow API

API REST desarrollada con **Node.js**, **Express**, **MongoDB** y **Mongoose**.

Esta versión corresponde a la **Pre-entrega Módulo 2 — Mocking y carga de datos de prueba en ShipNow**, construida sobre la arquitectura profesional por capas implementada en el Módulo 1.

---

## Objetivo del Módulo 2

Incorporar un sistema de mocking capaz de:

- generar usuarios simulados;
- generar repartidores simulados;
- generar pedidos simulados;
- generar entregas simuladas;
- devolver mocks sin persistirlos;
- insertar datos de prueba en MongoDB de forma controlada;
- mantener relaciones válidas entre las entidades;
- reutilizar las constantes de roles, estados y prioridades del dominio.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Nodemon
- bcrypt
- `@faker-js/faker`
- JavaScript ES Modules

---

## Arquitectura

El proyecto mantiene la separación por capas:

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

Para el módulo de mocking:

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

Los generadores se encuentran separados de las capas principales:

```text
src/mocks/
├── user.mock.js
├── courier.mock.js
├── store.mock.js
├── order.mock.js
└── delivery.mock.js
```

---

## Roles y constantes

Los roles del dominio se encuentran centralizados mediante constantes:

```javascript
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    COURIER: 'courier'
});
```

Los pedidos reutilizan `ORDER_STATUS` y `ORDER_PRIORITY`, y las entregas utilizan `DELIVERY_STATUS`.

Esto evita strings mágicos y mantiene los mocks alineados con los modelos reales.

---

# Endpoints de mocking

## Usuarios

```http
GET /api/mocks/users?qty=3
```

Genera usuarios simulados sin guardarlos en MongoDB.

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

La contraseña no se expone en la respuesta.

---

## Repartidores

```http
GET /api/mocks/couriers?qty=3
```

Todos los mocks generados utilizan:

```json
{
  "role": "courier"
}
```

---

## Pedidos

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

El total se calcula desde el backend a partir de:

```text
item.price × item.quantity
```

---

## Entregas

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
    },
    {
      "order": "30ac28c14edaaa25b5c4e0a6",
      "courier": null,
      "status": "pending",
      "assignedAt": null,
      "deliveredAt": null
    }
  ]
}
```

Reglas de coherencia:

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

# Seed en MongoDB

```http
POST /api/mocks/seed?qty=3
```

Genera e inserta datos de prueba relacionados.

No requiere body.

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
3 usuarios
3 repartidores
1 store auxiliar
3 pedidos
3 entregas
```

La cantidad de stores auxiliares se calcula con:

```text
Math.ceil(qty / 3)
```

con un mínimo de una store.

---

## Relaciones persistidas

El seed inserta las entidades en un orden controlado para obtener IDs reales de MongoDB.

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

Relaciones:

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

Durante el seed no se utilizan ObjectId aleatorios para representar relaciones persistidas: se reutilizan los `_id` reales insertados en MongoDB.

---

## Sincronización Order ↔ Delivery

Los estados se mantienen sincronizados:

```text
ORDER                  DELIVERY

created          →     pending
assigned         →     assigned
picked_up        →     picked_up
in_transit       →     in_transit
delivered        →     delivered
cancelled        →     cancelled
```

Esto evita combinaciones incoherentes entre pedido y entrega.

---

## Passwords en el seed

Los usuarios y repartidores simulados generan una contraseña temporal, pero antes de persistirse se procesa con el sistema de hashing del proyecto.

```text
password generada
      ↓
passwordHash()
      ↓
bcrypt
      ↓
MongoDB
```

Las contraseñas no se almacenan en texto plano.

---

# Parámetro `qty`

Los endpoints aceptan:

```text
?qty=
```

Rango permitido:

```text
1 a 100
```

Si no se proporciona `qty`, el valor por defecto es:

```text
10
```

Ejemplo:

```http
GET /api/mocks/users
```

devuelve 10 usuarios.

---

## Validaciones de `qty`

Casos inválidos:

```http
GET /api/mocks/users?qty=0
GET /api/mocks/users?qty=-1
GET /api/mocks/users?qty=abc
GET /api/mocks/users?qty=101
```

Respuesta:

```json
{
  "status": "error",
  "code": "INVALID_DATA",
  "message": "Los datos proporcionados son inválidos",
  "details": {
    "qty": "La cantidad debe ser un número entero entre 1 y 100"
  }
}
```

Status HTTP:

```text
400 Bad Request
```

---

# Resumen de endpoints

```text
GET   /api/mocks/users?qty=3
GET   /api/mocks/couriers?qty=3
GET   /api/mocks/orders?qty=3
GET   /api/mocks/deliveries?qty=3
POST  /api/mocks/seed?qty=3
```

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/terry2315/shipnow-api.git
```

Entrar al proyecto:

```bash
cd shipnow-api
```

Instalar dependencias:

```bash
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

# Seguridad del repositorio

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

---

# Pruebas realizadas

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

También se verificó en MongoDB:

```text
usuarios creados                    ✅
repartidores creados                ✅
roles correctos                     ✅
passwords hasheados                 ✅
stores creadas                      ✅
orders creadas                      ✅
deliveries creadas                  ✅
relaciones por ObjectId             ✅
Order ↔ Delivery sincronizados      ✅
```

---

# Checklist de la Pre-entrega Módulo 2

- [x] Router específico bajo `/api/mocks`.
- [x] Arquitectura por capas.
- [x] Lógica de mocking fuera de las rutas.
- [x] Mock de usuarios sin persistencia.
- [x] Mock de repartidores sin persistencia.
- [x] Mock de pedidos sin persistencia.
- [x] Mock de entregas sin persistencia.
- [x] Endpoint de seed para MongoDB.
- [x] Usuarios con roles válidos.
- [x] Repartidores con rol coherente.
- [x] Pedidos con estados permitidos.
- [x] Pedidos con prioridades permitidas.
- [x] Entregas relacionadas con pedidos.
- [x] Entregas relacionadas con repartidores cuando corresponde.
- [x] Relaciones mediante ObjectId reales durante el seed.
- [x] Uso de constantes del dominio.
- [x] Validación de `qty`.
- [x] Passwords hasheados antes de persistir.
- [x] README con instrucciones para probar mocks y seed.

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

**Pre-entrega Módulo 2 — Mocking y carga de datos de prueba en ShipNow**
