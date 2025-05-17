// This script will create a README.md file for the project
const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, 'README.md');
const content = `# Sistema de Gestión de Permisos

Este proyecto es una aplicación web para gestionar permisos, roles y usuarios, desarrollada con Node.js, Express, SQLite y EJS.

## Funcionalidades

### Gestión de Permisos
- Crear, editar, eliminar y listar permisos
- Validación de nombres únicos
- Búsqueda de permisos

### Gestión de Roles
- Crear, editar, eliminar y listar roles
- Asignar permisos a roles con checkboxes
- Visualizar permisos de cada rol

### Gestión de Usuarios
- Visualizar usuarios y sus roles
- Ver permisos heredados del rol asignado

### Control de Acceso
- Middleware para verificar permisos
- Protección de rutas basada en permisos

## Tecnologías Utilizadas

- **Node.js y Express**: Para el servidor web
- **SQLite con better-sqlite3**: Como base de datos
- **EJS**: Como motor de plantillas
- **Bootstrap 5**: Para la interfaz de usuario
- **Chalk**: Para logs con colores en consola
- **Morgan**: Para loguear peticiones HTTP

## Estructura del Proyecto

- **MVC + Repositorio + Servicio**: Arquitectura en capas
- **Middlewares**: Para validación y control de acceso
- **Manejo de Errores**: Captura y visualización amigable de errores

## Permisos Creados

- **create_user**: Crear usuarios
- **edit_user**: Editar usuarios
- **delete_user**: Eliminar usuarios
- **view_user**: Ver usuarios
- **create_role**: Crear roles
- **edit_role**: Editar roles
- **delete_role**: Eliminar roles
- **view_role**: Ver roles
- **create_permission**: Crear permisos
- **edit_permission**: Editar permisos
- **delete_permission**: Eliminar permisos
- **view_permission**: Ver permisos

## Asignación de Permisos a Roles

Los permisos se asignan a roles mediante un formulario con checkboxes, accesible desde la vista de edición del rol. Se pueden seleccionar múltiples permisos para cada rol.

## Visualización de Permisos en Usuarios

Los usuarios heredan los permisos de su rol asignado. En la vista de detalle de usuario se puede ver la lista de permisos que tiene el usuario a través de su rol.

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias: \`npm install\`
3. Ejecutar: \`npm start\` o \`npm run dev\` para modo desarrollo

## Datos Iniciales

Al iniciar la aplicación por primera vez, se crean automáticamente:
- Roles: 'admin' y 'user'
- Permisos básicos del sistema
- Usuario administrador: username: 'admin', password: 'admin123'
`;

fs.writeFileSync(readmePath, content);
console.log('README.md creado exitosamente.');
