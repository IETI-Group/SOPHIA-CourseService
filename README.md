# SOPHIA - Course Service

**SOPHIA Course Service** es un microservicio diseñado para gestionar todo lo relacionado con cursos dentro del ecosistema educativo SOPHIA. Este servicio actúa como el núcleo central para:

- **Gestión de Cursos**: Creación, actualización, eliminación y consulta de cursos
- **Administración de Contenido**: Manejo de materiales educativos, recursos y módulos de aprendizaje
- **Control de Acceso**: Gestión de permisos y roles para acceso a cursos
- **Seguimiento de Progreso**: Monitoreo del avance de estudiantes en los cursos
- **Integración con otros Servicios**: Comunicación con microservicios de usuarios, evaluaciones y notificaciones

## Descripción del Proyecto

Este es el backend de **SOPHIA Course Service**, una aplicación desarrollada en Node.js con TypeScript que proporciona servicios para la gestión de cursos. El backend incluye funcionalidades para el manejo de peticiones HTTP, middleware de seguridad, logging, y manejo de errores.

### 🏗️ Arquitectura del Microservicio

Este servicio forma parte de una arquitectura de microservicios donde:

- **Independencia**: Puede desplegarse y escalarse de forma independiente
- **Comunicación**: Utiliza APIs RESTful para interactuar con otros servicios
- **Monitoreo**: Incluye endpoints de salud y métricas para supervisión
- **Seguridad**: Implementa middleware de seguridad y manejo de CORS

### 📋 Casos de Uso Típicos

1. **Instructores**: Crear y gestionar cursos, subir contenido, revisar progreso de estudiantes
2. **Estudiantes**: Consultar cursos disponibles, acceder a materiales, seguir su progreso
3. **Administradores**: Supervisar la plataforma, gestionar permisos, generar reportes
4. **Sistemas Externos**: Integración con LMS, sistemas de calificaciones, plataformas de pago

### 🔄 Integración en el Ecosistema SOPHIA

- Se conecta con el servicio de **Usuarios** para autenticación y autorización
- Interactúa con el servicio de **Evaluaciones** para pruebas y calificaciones
- Comunica con el servicio de **Notificaciones** para alertas y recordatorios
- Integra con servicios de **Análiticas** para métricas y reportes

## Versión del Lenguaje

- **Node.js**: v24 
- **TypeScript**: 5.9.2
- **Target ES**: ES2022

## Dependencias

### Dependencias de Producción
- **express**: ^5.1.0 - Framework web para Node.js
- **cors**: ^2.8.5 - Middleware para manejar CORS
- **helmet**: ^8.1.0 - Middleware de seguridad
- **morgan**: ^1.10.1 - Logger de peticiones HTTP
- **winston**: ^3.17.0 - Logger de aplicación
- **dotenv**: 17.2.2 - Manejo de variables de entorno

### Dependencias de Desarrollo
- **@biomejs/biome**: 2.2.2 - Linter y formateador
- **nodemon**: 3.1.10 - Monitor de cambios para desarrollo
- **vitest**: 3.2.4 - Framework de testing
- **typescript**: 5.9.2 - Compilador TypeScript
- **supertest**: ^7.1.4 - Testing de APIs HTTP
- **typedoc**: 0.28.12 - Generación de documentación

## Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js 24 o superior
- pnpm  o npm

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd SOPHIA-CourseService
```

2. Instala las dependencias:
```bash
pnpm install
# o
npm install
```

3. Configura las variables de entorno:
   - Crea un archivo `.env` basado en las variables necesarias
   - Configura `CORS_ORIGIN` y otras variables según tu entorno

### Scripts Disponibles

- **Desarrollo**: `pnpm dev` - Ejecuta la aplicación en modo desarrollo con recarga automática
- **Construcción**: `pnpm build` - Compila el proyecto TypeScript
- **Producción**: `pnpm start` - Ejecuta la aplicación compilada
- **Testing**: `pnpm test` - Ejecuta las pruebas unitarias
- **Cobertura**: `pnpm coverage` - Ejecuta pruebas con reporte de cobertura
- **Linting**: `pnpm lint` - Ejecuta el linter
- **Formato**: `pnpm format` - Formatea el código
- **Documentación**: `pnpm doc` - Genera documentación TypeDoc

### Ejecución con Docker

1. Construcción de la imagen:
```bash
docker build -t sophia-course-service .
```

2. Ejecución del contenedor:
```bash
docker run -p 3000:3000 sophia-course-service
```

3. Para desarrollo con Docker Compose:
```bash
docker-compose -f docker-compose.dev.yml up
```

## Estructura del Proyecto

```
src/
├── app.ts                 # Configuración principal de Express
├── server.ts              # Punto de entrada del servidor
├── controllers/           # Controladores de rutas
├── middleware/            # Middleware personalizado
├── routes/                # Definición de rutas
└── utils/                 # Utilidades y helpers

test/                      # Pruebas unitarias
```

## Enlace al Documento de Planeación

📋 **Tablero de Planeación**: [SOPHIA - Trello Board](https://trello.com/invite/b/68be127bf45c3eaecf8cc70d/ATTI6891bb77d37b8e0184327426470801ed6871D57B/sophia)

El tablero de Trello contiene:
- Backlog del producto
- Historias de usuario
- Tareas asignadas al equipo de desarrollo
- Seguimiento del progreso del proyecto
