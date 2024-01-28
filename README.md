## BSmart con react & vite

# Requisitos previos

1. node version 18.12.1
2. react version 18.2.0
3. vite version 5.0.8

# Configuracion del proyecto

1. Clona el repositorio
   > git clone https://github.com/francochiapello/Bsmart_FrontEnd.git
2. Instala las dependencias

   > cd tu-proyecto
   > npm install

3. Variable de entorno

en el archivo /src/config.js cambie la ruta del backend en la seccion URL.

# Scripts Disponibles

1. > npm run dev

# Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas:

- **`assets`:** Almacena archivos estáticos, como imágenes, fuentes y estilos CSS.
- **`hooks`:** Contiene ganchos personalizados de React para proporcionar funcionalidades reutilizables.
- **`components`:** Aquí se encuentran componentes React reutilizables que no están vinculados a páginas específicas.
- **`pages`:** Contiene componentes React que representan páginas específicas de la aplicación.
- **`context`:** Almacena archivos relacionados con el uso del contexto de React para compartir datos entre componentes.
- **`routes`:** Contiene archivos relacionados con la configuración de rutas en la aplicación.
- **`services`:** Almacena módulos o archivos que gestionan de servicios o funcionalidades para la app.
