// Variable global para almacenar los datos actuales
let datosActuales = null;

// Inicializar Navbar

// Obtener el parámetro de la URL
const params = new URLSearchParams(window.location.search);
const dato = params.get('dato');

// Función para obtener los datos del CSV
async function obtenerDatosCompletos() {
  try {
    const SHEET_ID = '1x8Vpzr3rIXhV75bxlDj4VsFRUKgZZLLU6Dm50XFEJw8';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    const respuesta = await fetch(url);
    const textoCSV = await respuesta.text();
    
    // Convertir CSV a array de objetos
    const lineas = textoCSV.split('\n');
    const cabeceras = lineas[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    const datos = lineas.slice(1).map(linea => {
      const valores = linea.split(',').map(v => v.replace(/"/g, '').trim());
      const objeto = {};
      cabeceras.forEach((cabecera, index) => {
        objeto[cabecera] = valores[index] || '';
      });
      return objeto;
    });

    // Encontrar la fila que coincide con el dato
    const filaSeleccionada = datos.find(item => 
      Object.values(item)[1] === dato // Buscar en la segunda columna (índice 1)
    );

    if (filaSeleccionada) {
      mostrarDetalles(filaSeleccionada);
    } else {
      document.getElementById('detalles-content').innerHTML = '<p>No se encontraron datos</p>';
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
    document.getElementById('detalles-content').innerHTML = '<p>Error al cargar los datos</p>';
  }
}

// Función para mostrar los detalles
function mostrarDetalles(datos) {
  datosActuales = datos; // Guardar los datos en la variable global
  const detallesContent = document.getElementById('detalles-content');
  
  detallesContent.innerHTML = `
    <div class="contenedor">
      <h1>Detalles de la Ficha</h1>
      <p id="datos-ficha">
        ${Object.values(datos).join(',')}
      </p>
      <button id="btnGenerar" class="btn-generar-pdf">
        Generar PDF
      </button>
    </div>
  `;
}

// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', obtenerDatosCompletos);
