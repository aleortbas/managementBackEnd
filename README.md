Instrucciones para ejecutar el servidor

Este proyecto contiene un backend construido con Node.js, TypeScript, Express y conexión a SQL Server.Puedes seguir estos pasos tanto si clonaste el proyecto desde GitHub como si lo recibiste en un archivo .zip.

📁 Estructura del proyecto

managementBackEnd/
│
├── routes/              # Rutas de la API (categorías, usuarios, productos)
├── services/            # Lógica de negocio (queries a la base de datos)
├── uploads/             # Carpeta para archivos cargados 
├── dbConnection.ts      # Archivo de conexión a SQL Server
├── index.ts             # Archivo principal del servidor
├── .env                 # Variables de entorno (configuración)
├── package.json         # Dependencias del proyecto
├── tsconfig.json        # Configuración de TypeScript

Cómo ejecutar el proyecto

1. Descargar el proyecto
Opción A: Clonar desde GitHub

git clone https://github.com/tu-usuario/managementBackEnd.git
cd managementBackEnd

Opción B: Extraer desde ZIP
Extrae el archivo .zip donde desees.
Entra a la carpeta del proyecto:

cd managementBackEnd

2. Instalar dependencias
npm install

3. Configurar variables de entorno
Crea un archivo .env en la raíz con el siguiente contenido:

DB_USER=sa
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base
DB_SERVER=localhost
PORT=5000
JWT_SECRET=mideseosecreto

4. Verifica conexión con SQL Server
Abre SQL Server Management Studio y asegúrate de que:

* La base de datos esté creada
* El usuario (DB_USER) tenga acceso a ella
* El servidor esté activo (localhost o IP local)

5. Ejecutar en modo desarrollo
npm run dev

Endpoints disponibles

* POST /api/products - Crear un nuevo producto
* GET /api/products - Obtener la lista de productos
* GET /api/products/:id - Obtener los detalles de un producto específico
* PUT /api/products/:id - Actualizar un producto
* DELETE /api/products/:id - Eliminar un producto
* POST /api/categories - Crear una nueva categoría
* GET /api/categories - Obtener la lista de categorías
* GET /api/categories/:id - Obtener los detalles de una categoría
    específica
* PUT /api/categories/:id - Actualizar una categoría
* DELETE /api/categories/:id - Eliminar una categoría
* POST /api/cart - Agregar un producto al carrito
* GET /api/cart - Obtener el contenido del carrito
* POST /api/cart/checkout - Realizar una simulación de compra
* POST /api/users - Crear un nuevo usuario
* POST /api/users/login – Iniciar sesión
* POST /api/users/upload - Subir usuarios de manera masiva desde un
    archivo CSV