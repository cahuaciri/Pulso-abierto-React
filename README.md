# Pulso Abierto

Aplicación web desarrollada con React, TypeScript y Vite para consultar cotizaciones de criptomonedas, filtrar resultados, visualizar información detallada y administrar una lista de monedas favoritas.

La aplicación permite consultar Bitcoin, Ethereum y Solana mediante la API de CoinGecko.

**Aplicación publicada:** https://pulso-abierto-react-zeta.vercel.app

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- React Router
- Zustand para la gestión del estado global y favoritos.
- CoinGecko API para obtener cotizaciones.
- Vitest para pruebas automatizadas.
- React Testing Library para pruebas de componentes.
- ESLint para análisis estático del código.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/cahuaciri/Pulso-abierto-React.git
```

Ingresar a la carpeta del proyecto:

```bash
cd pulso-abierto-react
```

Instalar las dependencias:

```bash
npm ci
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador la URL que muestra Vite en la terminal.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Verifica TypeScript y genera la versión de producción. |
| `npm run preview` | Sirve localmente la versión de producción. |
| `npm run lint` | Ejecuta ESLint. |
| `npm test` | Ejecuta las pruebas con Vitest en modo interactivo. |
| `npm run test:run` | Ejecuta las pruebas automatizadas una vez. |

## Pruebas

Para ejecutar todas las pruebas automatizadas:

```bash
npm run test:run
```

Las pruebas utilizan Vitest y React Testing Library para verificar servicios, componentes y páginas de la aplicación.

## Generar y probar la versión de producción

Ejecutar:

```bash
npm run build
```

Luego:

```bash
npm run preview
```

Vite mostrará la dirección local para comprobar la versión generada.

## Funcionalidades principales

- Consulta de cotizaciones de criptomonedas.
- Filtrado y navegación por el listado.
- Visualización del detalle de cada criptomoneda.
- Administración de favoritos.
- Persistencia de favoritos mediante `localStorage`.
- Manejo de estados de carga y error.
- Navegación mediante React Router.

## Mejora de mantenibilidad

Durante la revisión final se identificó una duplicación en la lógica de formato de precios, presente en los componentes `CryptoCard` y `CryptoDetailPage`.

Para mejorar la mantenibilidad, se creó la utilidad reutilizable:

`src/utils/formatCurrency.ts`

Esta función centraliza el formato monetario mediante `Intl.NumberFormat`, evitando repetir lógica y facilitando futuros cambios.

Luego de la modificación se verificó que el proyecto compilara correctamente y que las pruebas automatizadas continuaran aprobándose.

## Despliegue

La aplicación está publicada en vercel:

**https://pulso-abierto-react-zeta.vercel.app**

El proyecto utiliza integración con GitHub para mantener el despliegue actualizado a partir de los cambios enviados al repositorio.

## Variables de entorno

La configuración actial del proyecto no requiere variables de entorno para su ejecución.
