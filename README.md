**\*\*# ShipNow API\*\***

API REST desarrollada con **\*\*\\\*\\\*Node.js\\\*\\\*\*\***, **\*\*\\\*\\\*Express\\\*\\\*\*\***, **\*\*\\\*\\\*MongoDB\\\*\\\*\*\*** y **\*\*\\\*\\\*Mongoose\\\*\\\*\*\***, organizada mediante una arquitectura profesional por capas.

Este README consolida el trabajo correspondiente a:

\\- **\*\*\\\*\\\*Pre-entrega Módulo 1 — Estructura profesional de ShipNow\\\*\\\*\*\***

\\- **\*\*\\\*\\\*Pre-entrega Módulo 2 — Mocking y carga de datos de prueba\\\*\\\*\*\***

\\- **\*\*\\\*\\\*Pre-entrega Módulo 3 — Manejo profesional de errores\\\*\\\*\*\***

\\- **\*\*\\\*\\\*Pre-entrega Módulo 4 — Logging y monitoreo básico\\\*\\\*\*\***

\- **\*\*\\\*\\\*Pre-entrega Módulo 5 — Documentación Swagger / OpenAPI\\\*\\\*\*\***

\- **\*\*\\*\\*Pre-entrega Módulo 6 — Testing funcional automatizado\\*\\*\*\***

\\---

**\*\*## Objetivo general\*\***

ShipNow fue refactorizado para separar responsabilidades, centralizar la configuración, generar datos de prueba relacionados, manejar errores de forma uniforme, registrar eventos importantes mediante un sistema profesional de logging, exponer documentación técnica interactiva mediante Swagger / OpenAPI y validar funcionalmente los principales endpoints mediante una suite automatizada de testing.

Flujo principal:

\\\`\\\`\\\`text

Router

  ↓

Controller

  ↓

Service

  ↓

Repository

  ↓

Model / MongoDB

\\\`\\\`\\\`

Capas transversales:

\\\`\\\`\\\`text

Environment Config

Error Handler

Request Logger

Winston Logger

\\\`\\\`\\\`

\\---

**\*\*# Tecnologías utilizadas\*\***

\\- Node.js

\\- Express

\\- MongoDB

\\- Mongoose

\\- dotenv

\\- bcrypt

\\- \\\`@faker-js/faker\\\`

\\- Winston

\\- \\\`winston-daily-rotate-file\\\`

\\- Nodemon

\- Mocha

\- Chai

\- Supertest

\- Cross-env

\\- JavaScript ES Modules

\\---

**\*\*# Arquitectura del proyecto\*\***

\\\`\\\`\\\`text

src/

├── config/

│   ├── env.config.js

│   ├── logger.config.js

│   └── db.config.js

├── constants/

├── controllers/

├── docs/

│   ├── components.swagger.js

│   ├── users.swagger.js

│   ├── orders.swagger.js

│   ├── mocks.swagger.js

│   └── logger.swagger.js

├── errors/

├── middlewares/

│   ├── errorHandler.middleware.js

│   ├── notFound.middleware.js

│   └── requestLogger.middleware.js

├── mocks/

├── models/

├── repositories/

├── routes/

├── services/

├── utils/

├── validators/

├── app.js

└── server.js

\\\`\\\`\\\`

\\---

**\*\*# Instalación\*\***

\\\`\\\`\\\`bash

git clone \\\<https://github.com/terry2315/shipnow-api.git>

cd shipnow-api

npm install

\\\`\\\`\\\`

Crear \\\`.env\\\` usando \\\`.env.example\\\` como referencia:

\\\`\\\`\\\`env

PORT=8080

MONGODB_URI=your_mongodb_connection_string

NODE_ENV=development

\\\`\\\`\\\`

Ejecutar:

\\\`\\\`\\\`bash

npm run dev

\\\`\\\`\\\`

\\---

**\*\*# Módulo 1 — Estructura profesional de ShipNow\*\***

**\*\*## Objetivo\*\***

Refactorizar la API utilizando:

\\\`\\\`\\\`text

Controller → Service → Repository

\\\`\\\`\\\`

y centralizar la configuración de entorno.

**\*\*### Controller\*\***

\\- recibe \\\`req\\\`;

\\- extrae \\\`params\\\`, \\\`query\\\` y \\\`body\\\`;

\\- invoca al Service;

\\- devuelve respuestas exitosas;

\\- no contiene lógica de negocio;

\\- no accede directamente a Mongoose.

**\*\*### Service\*\***

Contiene:

\\- validaciones;

\\- normalización;

\\- reglas del dominio;

\\- comprobación de entidades;

\\- relaciones;

\\- cálculo de totales;

\\- estados;

\\- prioridades;

\\- errores del dominio.

**\*\*### Repository\*\***

Es la capa que conoce MongoDB/Mongoose.

Puede utilizar:

\\\`\\\`\\\`text

find

findById

findByIdAndUpdate

findByIdAndDelete

insertMany

populate

sort

lean

\\\`\\\`\\\`

\\---

**\*\*## Variables de entorno\*\***

Se centralizan variables como:

\\\`\\\`\\\`text

PORT

MONGODB_URI

NODE_ENV

\\\`\\\`\\\`

El archivo \\\`.env\\\` no se sube al repositorio.

\\---

**\*\*## Constantes\*\***

**\*\*### Roles\*\***

\\\`\\\`\\\`javascript

export const ROLES = Object.freeze({

    ADMIN: 'admin',

    USER: 'user',

    COURIER: 'courier'

});

\\\`\\\`\\\`

**\*\*### Product\*\***

\\\`\\\`\\\`javascript

export const PRODUCT_STATUS = Object.freeze({

    AVAILABLE: 'available',

    OUT_OF_STOCK: 'out_of_stock'

});

\\\`\\\`\\\`

Además se utilizan:

\\\`\\\`\\\`text

ORDER_STATUS

ORDER_PRIORITY

DELIVERY_STATUS

\\\`\\\`\\\`

para evitar strings mágicos.

\\---

**\*\*## Endpoints\*\***

**\*\*### Users\*\***

\\\`\\\`\\\`text

POST    /api/users

GET     /api/users

GET     /api/users/:uid

PATCH   /api/users/:uid

DELETE  /api/users/:uid

\\\`\\\`\\\`

**\*\*### Products\*\***

\\\`\\\`\\\`text

POST    /api/products

GET     /api/products

GET     /api/products/:pid

PATCH   /api/products/:pid

DELETE  /api/products/:pid

\\\`\\\`\\\`

**\*\*### Stores\*\***

\\\`\\\`\\\`text

POST    /api/stores

GET     /api/stores

GET     /api/stores/:sid

PATCH   /api/stores/:sid

DELETE  /api/stores/:sid

\\\`\\\`\\\`

**\*\*### Orders\*\***

\\\`\\\`\\\`text

POST    /api/orders

GET     /api/orders

GET     /api/orders/:oid

PATCH   /api/orders/:oid

DELETE  /api/orders/:oid

\\\`\\\`\\\`

\\---

**\*\*# Módulo 2 — Mocking y carga de datos de prueba\*\***

**\*\*## Objetivo\*\***

Generar datos simulados mediante \\\`@faker-js/faker\\\` para:

\\\`\\\`\\\`text

Users

Couriers

Orders

Deliveries

\\\`\\\`\\\`

\\---

**\*\*## Endpoints sin persistencia\*\***

\\\`\\\`\\\`text

GET /api/mocks/users?qty=3

GET /api/mocks/couriers?qty=3

GET /api/mocks/orders?qty=3

GET /api/mocks/deliveries?qty=3

\\\`\\\`\\\`

Estos endpoints no guardan datos en MongoDB.

\\---

**\*\*## Seed\*\***

\\\`\\\`\\\`http

POST /api/mocks/seed?qty=3

\\\`\\\`\\\`

Ejemplo:

\\\`\\\`\\\`json

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

\\\`\\\`\\\`

\\---

**\*\*## Relaciones del seed\*\***

\\\`\\\`\\\`text

Users + Couriers

       ↓

Stores

       ↓

Orders

       ↓

Deliveries

\\\`\\\`\\\`

Relaciones:

\\\`\\\`\\\`text

Store.owner → User

Order.customer → User

Order.store → Store

Delivery.order → Order

Delivery.courier → User con role courier

\\\`\\\`\\\`

Los \\\`\\\_id\\\` persistidos provienen de MongoDB.

\\---

**\*\*## Sincronización Order ↔ Delivery\*\***

\\\`\\\`\\\`text

created       → pending

assigned      → assigned

picked_up     → picked_up

in_transit    → in_transit

delivered     → delivered

cancelled     → cancelled

\\\`\\\`\\\`

\\---

**\*\*## Passwords\*\***

Los usuarios mock que se persisten pasan por:

\\\`\\\`\\\`text

password mock

   ↓

passwordHash()

   ↓

bcrypt

   ↓

MongoDB

\\\`\\\`\\\`

\\---

**\*\*## Parámetro \\\`qty\\\`\*\***

Rango permitido:

\\\`\\\`\\\`text

1 a 100

\\\`\\\`\\\`

Valor por defecto:

\\\`\\\`\\\`text

10

\\\`\\\`\\\`

Casos inválidos:

\\\`\\\`\\\`text

qty=0

qty=-1

qty=abc

qty=101

\\\`\\\`\\\`

\\---

**\*\*# Módulo 3 — Manejo profesional de errores\*\***

**\*\*## Objetivo\*\***

Centralizar las respuestas de error.

Flujo:

\\\`\\\`\\\`text

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

\\\`\\\`\\\`

\\---

**\*\*## Diccionario de errores\*\***

Ejemplos:

\\\`\\\`\\\`text

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

\\\`\\\`\\\`

\\---

**\*\*## Formato uniforme\*\***

Ejemplo:

\\\`\\\`\\\`json

{

  "status": "error",

  "code": "INVALID_MOCK_QUANTITY",

  "message": "La cantidad de datos de prueba es inválida",

  "details": {

    "qty": "La cantidad debe ser un número entero entre 1 y 100"

  }

}

\\\`\\\`\\\`

Para errores inesperados:

\\\`\\\`\\\`json

{

  "status": "error",

  "code": "INTERNAL_SERVER_ERROR",

  "message": "Error interno del servidor"

}

\\\`\\\`\\\`

\\---

**\*\*# Módulo 4 — Logging y monitoreo básico\*\***

**\*\*## Objetivo\*\***

Incorporar un sistema profesional de logging con **\*\*\\\*\\\*Winston\\\*\\\*\*\***, integrado con la arquitectura y el manejo de errores existente.

Se utiliza:

\\\`\\\`\\\`text

winston

winston-daily-rotate-file

\\\`\\\`\\\`

\\---

**\*\*## Niveles personalizados\*\***

\\\`\\\`\\\`javascript

const levels = {

    fatal: 0,

    error: 1,

    warning: 2,

    info: 3,

    http: 4,

    debug: 5

};

\\\`\\\`\\\`

Niveles:

\\\`\\\`\\\`text

debug

http

info

warning

error

fatal

\\\`\\\`\\\`

\\---

**\*\*## Uso de niveles\*\***

\\\`\\\`\\\`text

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

\\\`\\\`\\\`

\\---

**\*\*## Formato\*\***

Cada log incluye:

\\\`\\\`\\\`text

timestamp + nivel + mensaje

\\\`\\\`\\\`

Ejemplo:

\\\`\\\`\\\`text

2026-10-17 11:23:46 [info] Conexión a MongoDB establecida correctamente

2026-10-17 11:23:46 [info] Servidor ShipNow escuchando en el puerto 8080

2026-10-17 11:26:00 [warning] INVALID_MOCK_QUANTITY - La cantidad de datos de prueba es inválida

\\\`\\\`\\\`

\\---

**\*\*## Development\*\***

Con:

\\\`\\\`\\\`env

NODE_ENV=development

\\\`\\\`\\\`

se muestran:

\\\`\\\`\\\`text

debug

http

info

warning

error

fatal

\\\`\\\`\\\`

\\---

**\*\*## Production\*\***

Con:

\\\`\\\`\\\`env

NODE_ENV=production

\\\`\\\`\\\`

se muestran:

\\\`\\\`\\\`text

info

warning

error

fatal

\\\`\\\`\\\`

No se muestran:

\\\`\\\`\\\`text

debug

http

\\\`\\\`\\\`

La prueba se realizó con:

\\\`\\\`\\\`bash

NODE_ENV=production npm run dev

\\\`\\\`\\\`

y el comportamiento fue verificado.

\\---

**\*\*## MongoDB\*\***

Conexión correcta:

\\\`\\\`\\\`text

[info] Conexión a MongoDB establecida correctamente

\\\`\\\`\\\`

Fallo crítico:

\\\`\\\`\\\`text

[fatal] Error al conectar con MongoDB: ...

\\\`\\\`\\\`

\\---

**\*\*## Servidor\*\***

Inicio correcto:

\\\`\\\`\\\`text

[info] Servidor ShipNow escuchando en el puerto 8080

\\\`\\\`\\\`

Los errores críticos de arranque se registran como \\\`fatal\\\`.

\\---

**\*\*## Request logger\*\***

Archivo:

\\\`\\\`\\\`text

src/middlewares/requestLogger.middleware.js

\\\`\\\`\\\`

Ejemplos:

\\\`\\\`\\\`text

[http] GET /api/logger-test 200 - 4ms

[http] GET /api/mocks/users?qty=-1 400 - 2ms

\\\`\\\`\\\`

Registra:

\\\`\\\`\\\`text

método HTTP

ruta

status

duración

\\\`\\\`\\\`

\\---

**\*\*## Integración con errorHandler\*\***

Los errores esperados 4xx se registran como:

\\\`\\\`\\\`text

warning

\\\`\\\`\\\`

Ejemplo:

\\\`\\\`\\\`text

[warning] INVALID_MOCK_QUANTITY - La cantidad de datos de prueba es inválida - GET /api/mocks/users?qty=-1

\\\`\\\`\\\`

Los errores inesperados o de servidor se registran como:

\\\`\\\`\\\`text

error

\\\`\\\`\\\`

Las fallas críticas de inicio se registran como:

\\\`\\\`\\\`text

fatal

\\\`\\\`\\\`

\\---

**\*\*## Logging en mocks\*\***

Generación simple:

\\\`\\\`\\\`text

debug

\\\`\\\`\\\`

Ejemplo:

\\\`\\\`\\\`text

[debug] Generando 10 usuarios mock

\\\`\\\`\\\`

Seed iniciado:

\\\`\\\`\\\`text

[info] Iniciando seed de 3 registros

\\\`\\\`\\\`

Seed completado:

\\\`\\\`\\\`text

[info] Seed completado: 3 users, 3 couriers, 1 stores, 3 orders y 3 deliveries

\\\`\\\`\\\`

Fallo técnico de seed:

\\\`\\\`\\\`text

error

\\\`\\\`\\\`

\\---

**\*\*## Logging de Orders\*\***

Después de que el Repository confirma la creación:

\\\`\\\`\\\`text

[info] Pedido creado correctamente: \\\<orderId>

\\\`\\\`\\\`

Esto evita registrar una creación exitosa antes de confirmar la persistencia.

\\---

**\*\*## Endpoint de prueba\*\***

\\\`\\\`\\\`http

GET /api/logger-test

\\\`\\\`\\\`

Respuesta:

\\\`\\\`\\\`json

{

  "status": "success",

  "message": "Todos los niveles del logger fueron ejecutados"

}

\\\`\\\`\\\`

En development genera:

\\\`\\\`\\\`text

debug

http

info

warning

error

fatal

\\\`\\\`\\\`

En production no muestra \\\`debug\\\` ni \\\`http\\\`.

\\---

**\*\*## Persistencia de logs\*\***

Los niveles:

\\\`\\\`\\\`text

error

fatal

\\\`\\\`\\\`

se guardan en:

\\\`\\\`\\\`text

logs/error-YYYY-MM-DD.log

\\\`\\\`\\\`

No se guardan allí:

\\\`\\\`\\\`text

debug

http

info

warning

\\\`\\\`\\\`

\\---

**\*\*## Rotación\*\***

Se utiliza \\\`winston-daily-rotate-file\\\`.

La configuración permite:

\\- rotación por fecha;

\\- limitar tamaño;

\\- limitar días conservados;

\\- compresión de archivos antiguos;

\\- mantener un audit file de control.

\\---

**\*\*## Gitignore\*\***

\\\`\\\`\\\`gitignore

node_modules

.env

logs/

uploads

coverage

npm-debug.log

\\\`\\\`\\\`

Los archivos de logs generados localmente no se suben al repositorio.

\\---

**\*\*## Auditoría de console.\\\*\*\***

Se ejecutó:

\\\`\\\`\\\`bash

grep -RIn "console\\\\." src

\\\`\\\`\\\`

No quedaron usos de:

\\\`\\\`\\\`text

console.log

console.error

console.warn

console.info

\\\`\\\`\\\`

Los mensajes relevantes fueron reemplazados por Winston.

\\---

\*\*

**---**

**# Módulo 5 — Documentación Swagger / OpenAPI**

**## Objetivo**

Documentar la API REST de ShipNow mediante **\*\*Swagger UI\*\*** y **\*\*OpenAPI 3.0.3\*\***, manteniendo la configuración separada de la lógica de rutas y reflejando el comportamiento real de la aplicación.

La documentación interactiva está disponible en:

\`\`\`http

GET /api/docs

\`\`\`

En entorno local:

\`\`\`text

http\://localhost:8080/api/docs

\`\`\`

\---

**## Dependencias**

Se utilizan:

\`\`\`text

swagger-jsdoc

swagger-ui-express

\`\`\`

La configuración general se encuentra separada en:

\`\`\`text

src/config/swagger.config.js

\`\`\`

y la interfaz Swagger UI se expone mediante una ruta dedicada.

\---

**## Estructura de documentación**

\`\`\`text

src/

├── config/

│   └── swagger.config.js

├── docs/

│   ├── components.swagger.js

│   ├── users.swagger.js

│   ├── orders.swagger.js

│   ├── mocks.swagger.js

│   └── logger.swagger.js

└── routes/

    └── docs.router.js

\`\`\`

Esto permite mantener la documentación separada de Controllers, Services y lógica de negocio.

\---

**## Información general OpenAPI**

La especificación utiliza:

\`\`\`text

OpenAPI: 3.0.3

Título: ShipNow API

Versión: 1.0.0

Servidor local: http\://localhost:8080

\`\`\`

La documentación describe el propósito de ShipNow y los módulos expuestos actualmente.

\---

**## Tags documentados**

Swagger organiza los endpoints mediante los siguientes tags:

\`\`\`text

Users

Orders

Deliveries

Mocks

Logger

\`\`\`

\`Deliveries\` actualmente documenta el endpoint real de generación de entregas mock:

\`\`\`http

GET /api/mocks/deliveries

\`\`\`

No se documentan rutas CRUD de Delivery que no existan en la API real.

\---

**## Schemas reutilizables**

Se definieron componentes reutilizables para evitar duplicación:

\`\`\`text

User

Store

OrderItem

Order

Delivery

ErrorResponse

SuccessResponse

MockSeedResult

\`\`\`

Los schemas reflejan los datos reales devueltos por la aplicación.

\`Order\` permite que \`customer\` y \`store\` sean representados tanto mediante ObjectId como mediante objetos poblados por Mongoose.

\---

**## Responses reutilizables**

También se centralizaron respuestas de error:

\`\`\`text

InvalidData

InvalidId

UserNotFound

UserAlreadyExists

ProductNotFound

StoreNotFound

OrderNotFound

InvalidOrderStatus

InvalidOrderPriority

InvalidMockQuantity

MockSeedFailed

RouteNotFound

InternalServerError

\`\`\`

Estas respuestas se basan en \`ERROR_DICTIONARY\` y reutilizan \`ErrorResponse\`.

\---

**## Users documentado**

\`\`\`text

POST    /api/users

GET     /api/users

GET     /api/users/{uid}

PATCH   /api/users/{uid}

DELETE  /api/users/{uid}

\`\`\`

Se documentan:

\- body de creación;

\- paginación mediante \`page\` y \`limit\`;

\- parámetro \`uid\`;

\- actualización parcial;

\- respuestas exitosas;

\- \`INVALID_DATA\`;

\- \`INVALID_ID\`;

\- \`USER_NOT_FOUND\`;

\- \`USER_ALREADY_EXISTS\`;

\- \`INTERNAL_SERVER_ERROR\`.

Pruebas realizadas desde Swagger UI:

\`\`\`text

POST usuario válido                → 201

POST email duplicado               → 409 USER_ALREADY_EXISTS

GET usuarios                       → 200

GET ID válido                      → 200

GET ID inválido                    → 400 INVALID_ID

GET usuario inexistente            → 404 USER_NOT_FOUND

PATCH válido                       → 200

PATCH ID inválido                  → 400 INVALID_ID

PATCH usuario inexistente          → 404 USER_NOT_FOUND

DELETE válido                      → 200

DELETE ID inválido                 → 400 INVALID_ID

DELETE usuario inexistente         → 404 USER_NOT_FOUND

\`\`\`

La contraseña no se expone en las respuestas.

\---

**## Orders documentado**

\`\`\`text

POST    /api/orders

GET     /api/orders

GET     /api/orders/{oid}

PATCH   /api/orders/{oid}

DELETE  /api/orders/{oid}

\`\`\`

La creación documenta:

\`\`\`text

customer

store

items

deliveryAddress

priority

\`\`\`

El backend calcula \`total\` y establece inicialmente:

\`\`\`text

status = created

\`\`\`

Pruebas realizadas:

\`\`\`text

POST válido                        → 201

customer ID inválido               → 400 INVALID_ID

customer inexistente               → 404 USER_NOT_FOUND

store ID inválido                  → 400 INVALID_ID

store inexistente                  → 404 STORE_NOT_FOUND

priority inválida                  → 400 INVALID_ORDER_PRIORITY

GET pedidos                        → 200

GET pedido válido                  → 200

GET ID inválido                    → 400 INVALID_ID

GET pedido inexistente             → 404 ORDER_NOT_FOUND

PATCH válido                       → 200

PATCH ID inválido                  → 400 INVALID_ID

PATCH pedido inexistente           → 404 ORDER_NOT_FOUND

PATCH priority inválida            → 400 INVALID_ORDER_PRIORITY

PATCH status inválido              → 400 INVALID_ORDER_STATUS

DELETE válido                      → 200

DELETE ID inválido                 → 400 INVALID_ID

DELETE pedido inexistente          → 404 ORDER_NOT_FOUND

\`\`\`

\---

**## Mocks documentado**

\`\`\`text

GET  /api/mocks/users

GET  /api/mocks/couriers

GET  /api/mocks/orders

GET  /api/mocks/deliveries

POST /api/mocks/seed

\`\`\`

Todos utilizan el query parameter opcional \`qty\`.

Reglas:

\`\`\`text

mínimo: 1

máximo: 100

default: 10

\`\`\`

Swagger UI aplica las restricciones \`minimum\` y \`maximum\` antes de enviar solicitudes inválidas.

\---

**## Mocks sin persistencia**

Ejemplo:

\`\`\`http

GET /api/mocks/users?qty=3

\`\`\`

Respuesta:

\`\`\`json

{

  "status": "success",

  "quantity": 3,

  "payload": []

}

\`\`\`

Estos endpoints no persisten datos:

\`\`\`text

GET /api/mocks/users

GET /api/mocks/couriers

GET /api/mocks/orders

GET /api/mocks/deliveries

\`\`\`

\---

**## Deliveries mock**

\`\`\`http

GET /api/mocks/deliveries?qty=3

\`\`\`

Se comprobó:

\`\`\`text

200 OK

quantity: 3

\`\`\`

La generación respeta la coherencia entre Order y Delivery.

\`\`\`text

created       → pending

assigned      → assigned

picked_up     → picked_up

in_transit    → in_transit

delivered     → delivered

cancelled     → cancelled

\`\`\`

Una Delivery \`pending\` puede tener:

\`\`\`text

courier = null

assignedAt = null

deliveredAt = null

\`\`\`

\---

**## Seed documentado**

\`\`\`http

POST /api/mocks/seed?qty=3

\`\`\`

Este endpoint **\*\*no utiliza request body\*\***.

La cantidad se recibe mediante query parameter.

Respuesta verificada:

\`\`\`json

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

\`\`\`

Status:

\`\`\`text

201 Created

\`\`\`

También se comprobó:

\`\`\`http

POST /api/mocks/seed?qty=0

\`\`\`

Resultado:

\`\`\`text

400 INVALID_MOCK_QUANTITY

\`\`\`

\---

**## Error de cantidad mock**

Ejemplo real:

\`\`\`json

{

  "status": "error",

  "code": "INVALID_MOCK_QUANTITY",

  "message": "La cantidad de datos de prueba es inválida",

  "details": {

    "qty": "La cantidad debe ser un número entero entre 1 y 100"

  }

}

\`\`\`

\---

**## Logger documentado**

Endpoint:

\`\`\`http

GET /api/logger-test

\`\`\`

Swagger aclara que es una herramienta técnica de validación y no una funcionalidad de negocio.

Respuesta:

\`\`\`json

{

  "status": "success",

  "message": "Todos los niveles del logger fueron ejecutados"

}

\`\`\`

La prueba confirmó:

\`\`\`text

debug

http

info

warning

error

fatal

\`\`\`

\---

**## Uso de Swagger UI**

1\. Iniciar el servidor:

\`\`\`bash

npm run dev

\`\`\`

2\. Abrir:

\`\`\`text

http\://localhost:8080/api/docs

\`\`\`

3\. Seleccionar un endpoint.

4\. Presionar \`Try it out\`.

5\. Completar parámetros o request body.

6\. Presionar \`Execute\`.

Swagger muestra:

\`\`\`text

Curl

Request URL

Server response

Response body

Response headers

Responses documentadas

\`\`\`

\---

**## Auditoría de Swagger**

Se comprobó:

\`\`\`text

Users documentado             ✅

Orders documentado            ✅

Deliveries documentado        ✅

Mocks documentado             ✅

Logger documentado            ✅

Schemas reutilizables         ✅

Responses reutilizables       ✅

Errores reales documentados   ✅

Status HTTP reales            ✅

Try it out funcionando        ✅

\`\`\`

También se ejecutó:

\`\`\`bash

grep -RIn "console\\." src

\`\`\`

sin obtener resultados.

\---

**# Checklist Módulo 5**

\- [x] Swagger UI disponible en \`/api/docs\`.

\- [x] OpenAPI 3.0.3.

\- [x] Configuración separada de rutas.

\- [x] Información general de la API.

\- [x] Servidor local documentado.

\- [x] Tags \`Users\`, \`Orders\`, \`Deliveries\`, \`Mocks\`, \`Logger\`.

\- [x] Users documentado.

\- [x] Orders documentado.

\- [x] Deliveries documentado mediante endpoint real.

\- [x] Mocks documentado.

\- [x] Logger documentado.

\- [x] Parámetros de ruta documentados.

\- [x] Query params documentados.

\- [x] Request bodies documentados.

\- [x] Respuestas exitosas documentadas.

\- [x] Errores alineados con \`ERROR_DICTIONARY\`.

\- [x] \`INVALID_ID\`.

\- [x] \`INVALID_DATA\`.

\- [x] \`USER_NOT_FOUND\`.

\- [x] \`USER_ALREADY_EXISTS\`.

\- [x] \`STORE_NOT_FOUND\`.

\- [x] \`ORDER_NOT_FOUND\`.

\- [x] \`INVALID_ORDER_STATUS\`.

\- [x] \`INVALID_ORDER_PRIORITY\`.

\- [x] \`INVALID_MOCK_QUANTITY\`.

\- [x] \`MOCK_SEED_FAILED\`.

\- [x] \`INTERNAL_SERVER_ERROR\`.

\- [x] Schemas reutilizables.

\- [x] Responses reutilizables.

\- [x] Swagger probado con \`Try it out\`.

\- [x] README actualizado.

**# Pruebas realizadas\*\***

**\*\*## Logger test en development\*\***

\\\`\\\`\\\`http

GET /api/logger-test

\\\`\\\`\\\`

Comprobado:

\\\`\\\`\\\`text

debug      ✅

http       ✅

info       ✅

warning    ✅

error      ✅

fatal      ✅

\\\`\\\`\\\`

**\*\*## Archivo de errores\*\***

Comprobado:

\\\`\\\`\\\`text

error      ✅ persistido

fatal      ✅ persistido

warning    ❌ no persistido

info       ❌ no persistido

http       ❌ no persistido

debug      ❌ no persistido

\\\`\\\`\\\`

**\*\*## Error de mocks\*\***

\\\`\\\`\\\`http

GET /api/mocks/users?qty=-1

\\\`\\\`\\\`

Resultado:

\\\`\\\`\\\`text

400 INVALID_MOCK_QUANTITY

\\\`\\\`\\\`

Con logs:

\\\`\\\`\\\`text

[warning] INVALID_MOCK_QUANTITY ...

[http] GET /api/mocks/users?qty=-1 400 - 2ms

\\\`\\\`\\\`

El warning no se guarda en \\\`error.log\\\`.

**\*\*## Production\*\***

Comprobado:

\\\`\\\`\\\`text

info       ✅

warning    ✅

error      ✅

fatal      ✅

debug      ❌

http       ❌

\\\`\\\`\\\`

\\---

**\*\*# Checklist Módulo 1\*\***

\\- [x] Arquitectura Controller → Service → Repository.

\\- [x] Configuración centralizada.

\\- [x] Users refactorizado.

\\- [x] Products refactorizado.

\\- [x] Constantes del dominio.

\\- [x] \\\`.env.example\\\`.

\\- [x] \\\`.env\\\` ignorado.

**\*\*# Checklist Módulo 2\*\***

\\- [x] Mock Users.

\\- [x] Mock Couriers.

\\- [x] Mock Orders.

\\- [x] Mock Deliveries.

\\- [x] Seed controlado.

\\- [x] Relaciones ObjectId.

\\- [x] Passwords hasheados.

\\- [x] Validación de \\\`qty\\\`.

\\- [x] Order ↔ Delivery sincronizados.

**\*\*# Checklist Módulo 3\*\***

\\- [x] Errores personalizados.

\\- [x] Diccionario centralizado.

\\- [x] Middleware global.

\\- [x] \\\`asyncHandler\\\`.

\\- [x] Formato uniforme.

\\- [x] Mocks integrados.

\\- [x] \\\`INVALID_MOCK_QUANTITY\\\`.

\\- [x] \\\`MOCK_SEED_FAILED\\\`.

**\*\*# Checklist Módulo 4\*\***

\\- [x] Winston.

\\- [x] Logger centralizado.

\\- [x] \\\`debug\\\`.

\\- [x] \\\`http\\\`.

\\- [x] \\\`info\\\`.

\\- [x] \\\`warning\\\`.

\\- [x] \\\`error\\\`.

\\- [x] \\\`fatal\\\`.

\\- [x] Development y production diferenciados.

\\- [x] MongoDB integrado.

\\- [x] Server integrado.

\\- [x] ErrorHandler integrado.

\\- [x] Mocks integrados.

\\- [x] Request logger.

\\- [x] \\\`/api/logger-test\\\`.

\\- [x] Persistencia de \\\`error\\\` y \\\`fatal\\\`.

\\- [x] Rotación.

\\- [x] \\\`logs/\\\` ignorado.

\\- [x] Auditoría de \\\`console.\\\*\\\`.

\\- [x] README actualizado.

\\---

**# Módulo 6 — Testing funcional automatizado**

## Objetivo

Incorporar pruebas funcionales automatizadas para validar el comportamiento real de los principales endpoints de ShipNow, contemplando tanto respuestas exitosas como errores esperados.

La suite fue implementada utilizando:

```text
Mocha
Chai
Supertest
Cross-env
Mongoose
```

Las pruebas se ejecutan contra una base de datos independiente de testing y no dependen de registros creados manualmente.

---

## Dependencias de testing

Se instalaron como dependencias de desarrollo:

```bash
npm install --save-dev mocha chai supertest cross-env
```

El script configurado en `package.json` es:

```json
"test": "cross-env NODE_ENV=test mocha --file tests/setup/test.setup.js \"tests/**/*.test.js\" --timeout 10000"
```

La suite completa se ejecuta mediante:

```bash
npm test
```

---

## Entorno separado de testing

El proyecto utiliza un archivo independiente:

```text
.env.test
```

Este archivo contiene las variables reales del entorno de pruebas y está excluido del repositorio mediante `.gitignore`.

Como referencia versionable se incluye:

```text
.env.test.example
```

Ejemplo:

```env
NODE_ENV=test
PORT=8081
MONGODB_URI=your_testing_mongodb_connection_string
```

La base utilizada por los tests debe ser independiente de desarrollo y su nombre debe contener la palabra `test`.

Ejemplo:

```text
shipnow_test
```

Esto evita ejecutar accidentalmente la suite sobre una base de desarrollo o producción.

---

## Carga de variables de entorno

`src/config/env.config.js` selecciona el archivo de entorno según `NODE_ENV`.

Flujo:

```text
NODE_ENV=test
      ↓
.env.test
      ↓
MongoDB de testing
```

En development continúa utilizando:

```text
.env
```

---

## Separación entre app y servidor

La aplicación Express se exporta desde:

```text
src/app.js
```

sin ejecutar `listen()`.

El inicio del servidor permanece en:

```text
src/server.js
```

Esto permite que Supertest importe directamente la instancia de Express durante las pruebas sin levantar un servidor HTTP externo.

---

## Estructura de tests

```text
tests/
├── setup/
│   └── test.setup.js
├── logger.test.js
├── mocks.test.js
├── order.test.js
├── routes.test.js
├── swagger.test.js
└── user.test.js
```

Cada archivo agrupa pruebas relacionadas con un módulo o comportamiento específico.

---

## Configuración global de testing

Archivo:

```text
tests/setup/test.setup.js
```

Responsabilidades:

```text
Verificar NODE_ENV=test
        ↓
Conectar a MongoDB de testing
        ↓
Comprobar que el nombre de la DB contiene "test"
        ↓
Limpiar la base antes de la suite
        ↓
Ejecutar tests
        ↓
Limpiar la base al finalizar
        ↓
Desconectar Mongoose
```

Esta protección evita que una suite automatizada elimine datos de una base equivocada.

---

## Datos controlados y repetibles

Los tests generan sus propios datos cuando los necesitan.

Ejemplo para Orders:

```text
Crear User de testing
        ↓
Crear Store de testing
        ↓
Crear Order
        ↓
Ejecutar validación
```

Entre casos se limpian las colecciones necesarias para evitar dependencia entre tests.

La suite fue ejecutada consecutivamente sin borrar datos manualmente y obtuvo el mismo resultado en ambas ejecuciones.

---

## Tests de Users

Endpoints y escenarios validados:

```text
GET /api/users
GET /api/users/:uid
```

Casos cubiertos:

```text
Listado de usuarios              → 200
Usuario existente por ID         → 200
ID inválido                      → 400 INVALID_ID
Usuario inexistente              → 404 USER_NOT_FOUND
```

También se verifica:

```text
status
payload
_id
firstName
lastName
email
role
documents
createdAt
updatedAt
```

La contraseña no debe estar presente en las respuestas.

---

## Tests de Orders

Endpoints funcionales cubiertos:

```text
GET   /api/orders
POST  /api/orders
GET   /api/orders/:oid
PATCH /api/orders/:oid
```

Casos exitosos:

```text
Obtener pedidos                  → 200
Crear pedido                     → 201
Obtener pedido por ID            → 200
Actualizar estado                → 200
```

Errores esperados:

```text
Datos obligatorios incompletos   → 400 INVALID_DATA
Pedido inexistente               → 404 ORDER_NOT_FOUND
Estado inválido                  → 400 INVALID_ORDER_STATUS
```

También se valida el cálculo automático del total.

Ejemplo probado:

```text
2 × 30 = 60
1 × 40 = 40
Total  = 100
```

---

## Tests de Mocks

Se probaron:

```text
GET /api/mocks/users?qty=3
GET /api/mocks/couriers?qty=3
GET /api/mocks/orders?qty=3
GET /api/mocks/deliveries?qty=3
```

Se valida:

```text
status = success
quantity = 3
payload.length = 3
```

También se comprobó el error:

```text
GET /api/mocks/users?qty=0
```

Resultado:

```text
400 INVALID_MOCK_QUANTITY
```

---

## Test de Logger

Endpoint:

```http
GET /api/logger-test
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "Todos los niveles del logger fueron ejecutados"
}
```

Durante la prueba se ejecutan los niveles:

```text
debug
http
info
warning
error
fatal
```

---

## Test de Swagger

Se valida que la documentación sea accesible mediante:

```http
GET /api/docs/
```

La prueba comprueba:

```text
HTTP 200
Content-Type text/html
Swagger UI presente en la respuesta
```

---

## Test de ruta inexistente

Se prueba una URL no registrada:

```http
GET /api/route-that-does-not-exist
```

Respuesta esperada:

```json
{
  "status": "error",
  "code": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}
```

Durante esta prueba se detectó y corrigió un manejador 404 duplicado en `app.js` que respondía directamente y evitaba pasar por el `errorHandler` centralizado.

El flujo final quedó:

```text
Ruta inexistente
      ↓
notFoundHandler
      ↓
createError(ROUTE_NOT_FOUND)
      ↓
errorHandler
      ↓
Respuesta uniforme
```

---

## Resultado final de la suite

Primera ejecución completa:

```text
20 passing
0 failing
```

Segunda ejecución consecutiva:

```text
20 passing
0 failing
```

Esto confirma que las pruebas son repetibles y no dependen del estado previo de la base de datos.

---

## Seguridad de archivos de entorno

`.gitignore` incluye:

```gitignore
node_modules
.env
.env.test
logs/
uploads
coverage
npm-debug.log
```

Se versionan únicamente los archivos de ejemplo:

```text
.env.example
.env.test.example
```

Las credenciales reales de MongoDB no deben subirse al repositorio.

---

## Checklist Módulo 6

- [x] Entorno de testing independiente.
- [x] Base de datos separada para pruebas.
- [x] `.env.test` protegido mediante `.gitignore`.
- [x] `.env.test.example` versionable.
- [x] Mocha instalado.
- [x] Chai instalado.
- [x] Supertest instalado.
- [x] Cross-env instalado.
- [x] Script `npm test` configurado.
- [x] Express separado de `server.listen()`.
- [x] Setup global de testing.
- [x] Protección para exigir una DB con `test` en el nombre.
- [x] Limpieza antes y después de la suite.
- [x] Datos controlados y repetibles.
- [x] Tests de Users.
- [x] Tests de Orders.
- [x] Actualización de estado de Order.
- [x] Tests de Mocks.
- [x] Test de Logger.
- [x] Test de Swagger.
- [x] Test de ruta inexistente.
- [x] `INVALID_DATA` validado.
- [x] `INVALID_ID` validado.
- [x] `USER_NOT_FOUND` validado.
- [x] `ORDER_NOT_FOUND` validado.
- [x] `INVALID_ORDER_STATUS` validado.
- [x] `INVALID_MOCK_QUANTITY` validado.
- [x] `ROUTE_NOT_FOUND` validado.
- [x] Formato uniforme de errores comprobado.
- [x] Suite completa con 20 tests passing.
- [x] Suite ejecutada dos veces consecutivas.
- [x] README actualizado.

---

**\*\*# Commits sugeridos\*\***

\\\`\\\`\\\`bash

git commit -m "feat: complete module 1 layered architecture"

git commit -m "feat: complete module 2 mocking and seed system"

git commit -m "feat: complete module 3 centralized error handling"

git commit -m "feat: complete module 4 logging and monitoring"

git commit -m "feat: complete module 5 swagger api documentation"

git commit -m "feat: complete module 6 functional testing"

\\\`\\\`\\\`

\\---

**\*\*# Autor\*\***

**\*\*\\\*\\\*Terry Leoner Guzman Porras\\\*\\\*\*\***

GitHub:

\\\`\\\`\\\`text

https\\://github.com/terry2315

\\\`\\\`\\\`

\\---

**\*\*# Curso\*\***

Proyecto desarrollado como parte de la formación Backend de Coderhouse.

Incluye las pre-entregas de los módulos 1, 2, 3, 4, 5 y 6 de ShipNow API.
