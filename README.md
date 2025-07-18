
# 🛍️ Proyecto Final: API RESTful para E-Commerce

Este proyecto consiste en una API RESTful desarrollada con **Node.js** y **Express**, que permite gestionar los productos de una tienda en línea (E-Commerce). La API implementa operaciones CRUD completas, autenticación con JWT, persistencia local con archivos JSON y conexión a base de datos en la nube usando **Firebase Firestore**.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Firebase Firestore
- JWT (jsonwebtoken)
- dotenv
- cors
- nodemon (entorno de desarrollo)

---

## 🗂️ Estructura del proyecto

```
📁 controllers       → Lógica de negocio (products, auth)
📁 routes            → Rutas para productos y autenticación
📁 services          → Acceso a datos: JSON o Firestore
📁 middleware        → Autenticación y manejo de errores
📁 utils             → Utilitarios como token JWT
📁 public            → (opcional) archivos estáticos, carpeta vacia
📄 app.js            → Configura middlewares y rutas
📄 server.js         → Arranca el servidor
📄 .env              → Variables de entorno
📄 products.json     → Almacenamiento local

```

---

## ⚙️ Instalación y ejecución

1. Cloná el repositorio:
```bash
git clone https://github.com/Modolaaa/proyecto-final-ecommerce-lautaro-modola.git
cd proyecto-final-ecommerce-lautaro-modola
```

2. Instalá dependencias:
```bash
npm install
```

3. Configurá las variables de entorno en un archivo `.env`:
```
PORT=3000
JWT_SECRET=miclavesupersecreta
```

4. (Opcional) Configurá Firebase:
   - Creá un proyecto en Firebase y configura tus variables de entorno en .env

5. Ejecutá el proyecto en modo desarrollo:
```bash
npm run dev
```

---

## 🔐 Autenticación

Para usar la API necesitás loguearte con el siguiente usuario:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

La respuesta incluirá un `token` JWT que debés enviar en las rutas protegidas mediante el header:

```
Authorization: Bearer <token>
```

---

## 📡 Endpoints de la API

### 🔑 Login
```
POST /api/auth/login
```
Body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### 📦 Productos

#### GET todos los productos
```
GET /api/products
```

#### GET producto por ID
```
GET /api/products/:id
```

#### POST crear nuevo producto *(requiere token)*
```
POST /api/products
```
Body:
```json
{
  "name": "Zapatilla negra",
  "description": "Zapatilla de cuero ecológico",
  "price": 13999,
  "stock": 20
}
```

#### PUT actualizar totalmente *(requiere token)*
```
PUT /api/products/:id
```

#### PATCH actualización parcial *(requiere token)*
```
PATCH /api/products/:id
```

#### DELETE eliminar producto *(requiere token)*
```
DELETE /api/products/:id
```

---

## 🔄 Modo de almacenamiento

Cambiar entre almacenamiento local (JSON) y Firestore es tan simple como modificar una variable en `productController.js`:

```js
const useFirestore = true;
```

---

## 🧪 Testeo con Postman

1. Hacer `POST /api/auth/login` y obtener token.
2. Enviar token en los headers de rutas protegidas:
   ```
   Authorization: Bearer <token>
   ```

---

## 🚀 Despliegue (Vercel)

URL del entorno de producción:  
👉 `https://api-ecommerce-nombreapellido.up.railway.app` 

---

## 🧑 Autor

- **Lautaro Modola**
---

## 📝 Licencia

Este proyecto es parte del curso de Node.js y fue desarrollado con fines educativos.
