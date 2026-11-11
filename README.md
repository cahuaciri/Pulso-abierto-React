Actividad Práctica Integradora 2: Caso
Pulso Abierto React
Materia: Programación Web- Módulo 2.
Carrera: Tecnicatura en Programación.
Fecha: noviembre de 2026.

1)	Evolución del proyecto:
a)	Elementos que se conservaron: 
•	La fuente de datos y la lógica de negocio: Se mantuvo la integración con la API externa de CoinGecko para obtener las cotizaciones de Bitcoin, Ethereum y Solana, la cual ahora está organizada en la capa de servicios (services/cryptoService.ts)
•	La identidad visual y estilos: Los conceptos de diseño, colores y variables CSS se mantuvieron, adaptándolos a la nueva estructura modular de hojas de estilo (index.css).

b)	Reconstrucción mediante React:
•	La arquitectura de la interfaz (Componentización): Todo el árbol de elementos visuales estáticos pasó a ser un sistema de componentes reutilizables e independientes (components/CryptoCard.tsx, CryptoList.tsx, QueryControls.tsx, StatusMessage.tsx).
•	El sistema de vistas y navegación (Ruteo): Mientras que en la primera versión era una página única (index.html), en React implemente un sistema de páginas (pages/HomePage.tsx, CryptoDetailPage.tsx, NotFoundPage.tsx) para manejar múltiples vistas y estados de error (404) de forma fluida.
•	El flujo de datos y renderizado dinámico: Se reemplazó la manipulación imperativa del DOM por un enfoque declarativo. Ahora React se encarga de actualizar automáticamente la interfaz cada vez que el estado de la aplicación cambia.

c)	Manipulación del DOM:
•	Antes para mostrar los resultados o cambiar el estado de carga, tenías que buscar manualmente los elementos en el DOM usando métodos como document.getElementById('results-container') y modificar su contenido interno mediante código imperativo o concatenación de cadenas de HTML:
Ejemplo clásico en TS
const container = document.getElementById('results-container');
if (container) {
  container.innerHTML = `<div class="card">...</div>`; // Modificación directa del DOM
}

Esto fue reemplazado por estado (useState), propiedades (props) y renderizado condicional. Ya no tocas el DOM directamente; declaras cómo debe verse la interfaz en función de los datos:
Ejemplo en React (dentro de un componente)
const [cryptos, setCryptos] = useState<Crypto[]>([]);

return (
  <div className="crypto-grid">
    {cryptos.map((crypto) => (
      <CryptoCard key={crypto.id} data={crypto} />
    ))}
  </div>
);

2)	Organización de componentes y estado:
a)	Esquema componentes principales:
App
 └── Router / Routes
      ├── HomePage
      │    ├── QueryControls
      │    ├── StatusMessage
      │    └── CryptoList
      │         └── CryptoCard (reutilizable N veces)
      ├── CryptoDetailPage
      └── NotFoundPage

b)	Responsabilidad de cada componente:
•	App.tsx / Rutas: Actúa como el punto de entrada de la aplicación. Configura las rutas (react-router) y envuelve la app con los proveedores necesarios. 
•	HomePage.tsx: Es la vista o página principal. Coordina la lógica general de la consulta, mantiene el estado global de la lista de criptomonedas y distribuye los datos a los componentes hijos. 
•	QueryControls.tsx: Formulario de control que contiene el botón de consulta e inputs de filtrado u ordenamiento. Su responsabilidad es capturar la acción del usuario y notificar al componente padre. 
•	StatusMessage.tsx: Maneja la comunicación de estados de la interfaz hacia el usuario (mensajes de "Cargando...", estado inicial sin consulta o mensajes de error). 
•	CryptoList.tsx: Componente contenedor de la grilla de resultados. Recibe un arreglo de criptomonedas y las mapea para renderizarlas. 
•	CryptoCard.tsx: Componente puramente visual (de presentación) que recibe la información de una sola criptomoneda vía props y renderiza sus datos (nombre, precio, variación). 
•	CryptoDetailPage.tsx: Vista de detalle que captura el parámetro de la URL (por ejemplo, el ID de la moneda) para consultar y mostrar la información extendida de una criptomoneda en particular. 
•	NotFoundPage.tsx: Vista de contingencia que se muestra cuando el usuario intenta ingresar a una ruta inexistente (Error 404).
c)	Estados principales utilizados:
Los estados clave que controlan la lógica de la aplicación en Home Page:
•	cryptos (Crypto []): Almacena el listado de criptomonedas obtenido de la API de CoinGecko tras realizar una consulta exitosa.
•	loading (bolean): Indica si hay una petición HTTP en curso. Permite activar estados visuales de carga.
•	error (string | null): Guarda el mensaje de error si la petición a la API falla (problema de red, límite de peticiones de la API, etc.), permitiendo renderizar el mensaje de error o la acción de reintento.

3)	Formulario, rutas y acceso a datos:
a)	Reglas de validación implementadas con Zod:
En la carpeta schemas/ (querySchema.ts), utilicé Zod para garantizar la integridad de los datos tanto en la entrada (formularios o filtros) como en la salida (respuestas externas). Las reglas principales cumplen con lo siguiente: 
•	Tipado estricto en tiempo de ejecución: Zod permite validar que los datos cumplan exactamente con la estructura esperada antes de ser procesados por la aplicación.
•	Validación de campos y tipos: Asegura que los parámetros requeridos (como cadenas de texto para búsquedas, identificadores o filtros numéricos) tengan el tipo de dato correcto, longitudes mínimas/máximas o valores permitidos.
•	Prevención de errores: Si un dato no cumple con el esquema definido, Zod lanza errores descriptivos que evitan que la aplicación falle de forma inesperada al intentar renderizar información malformada.

b)	Rutas principales:
•	Ruta Principal (/ - HomePage.tsx): Es la vista de inicio. Contiene el panel de control de consultas (QueryControls), los mensajes de estado y la lista de criptomonedas obtenidas.
•	Ruta de Detalle (/crypto/:id o similar - CryptoDetailPage.tsx): Vista dinámica que captura el parámetro del identificador de la criptomoneda desde la URL para realizar una consulta específica y mostrar información detallada de ese activo en particular.
•	Ruta de Error / Comodín (* - NotFoundPage.tsx): Vista de contingencia que se activa automáticamente cuando el usuario ingresa a una URL que no existe en la aplicación, mostrando un mensaje de error 404 y opciones de retorno.
c)	Responsabilidad del servicio que consulta la API:
Ubicado en services/cryptoService.ts, este módulo tiene un rol fundamental bajo el principio de separación de responsabilidades:

•	Desacoplar la lógica de red: Centraliza todas las llamadas HTTP (hacia la API de CoinGecko), evitando que los componentes de React tengan que lidiar directamente con operaciones asíncronas complejas o lógica de fetch/axios.
•	Mapeo y transformación de datos: Recibe la respuesta cruda (raw data) de la API y la adapta a los tipos e interfaces definidos en TypeScript (types/api.ts y types/crypto.ts), asegurando que los componentes reciban un objeto limpio y predecible. 
•	Gestión de errores: Captura las excepciones de red o fallos en las peticiones (como límites de peticiones excedidos o problemas de conexión) para propagarlos de forma controlada hacia los componentes y activar los mensajes de error correspondientes en la interfaz.
