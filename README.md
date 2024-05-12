
# Reto tech - Christian Espana

Este proyecto es una API RESTful construida con Express y TypeScript. Utiliza `pnpm` como gestor de paquetes y Docker para la contenerización y despliegue.

## Requisitos

- Node.js (v18 o superior recomendado)
- pnpm
- Docker

## Configuración del Entorno

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/chrisaandes/reto-tech
cd reto-tech
```

Instala las dependencias utilizando `pnpm`:

```bash
pnpm install
```

## Desarrollo

Para iniciar el servidor de desarrollo, puedes ejecutar el siguiente comando, que compilará el TypeScript y ejecutará la aplicación Express:

```bash
pnpm run dev
```


## Compilación

Para compilar el proyecto para producción, ejecuta:

```bash
pnpm run build
```

Esto compilará los archivos TypeScript en la carpeta `dist`.

## Ejecución con Docker


Para simplificar la gestión del entorno Docker, puedes utilizar el script Bash proporcionado. Sigue estos pasos para ejecutar el script:

1. Asegúrate de que el script `deploy-local.sh` es ejecutable:

   ```bash
   chmod +x docker_setup.sh
   ```

2. Ejecuta el script desde la terminal:

   ```bash
   ./docker_setup.sh
   ```

Este script inicializará Docker Swarm si es necesario, construirá tus imágenes y desplegará tus servicios, asegurando una configuración correcta de tu entorno.

```

Esto expondrá la aplicación en el puerto `3000` de tu máquina local.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

- `/src`: Contiene los archivos fuente de TypeScript.
- `/dist`: Contiene los archivos compilados de JavaScript (generados).
- `Dockerfile`: Define la configuración para construir la imagen de Docker.
- `docker-compose.yml`: (Opcional) Para configurar y orquestar múltiples contenedores.
- `package.json`: Metadatos y dependencias del proyecto.
- `tsconfig.json`: Configuración para el compilador de TypeScript.

