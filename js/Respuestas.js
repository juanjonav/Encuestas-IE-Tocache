class LectorSheets {
  constructor() {
    this.SHEET_ID = '1x8Vpzr3rIXhV75bxlDj4VsFRUKgZZLLU6Dm50XFEJw8'
    this.datos = []
  }

  async obtenerDatos() {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/gviz/tq?tqx=out:csv`
      const respuesta = await fetch(url)
      const textoCSV = await respuesta.text()
      
      // Convertir CSV a array de objetosA
      const lineas = textoCSV.split('\n')
      const cabeceras = lineas[0].split(',').map(h => h.replace(/"/g, '').trim())
      console.log('Nombres de columnas:', cabeceras); // Esto te mostrará los nombres exactos
      
      this.datos = lineas.slice(1).map(linea => {
        const valores = linea.split(',').map(v => v.replace(/"/g, '').trim())
        const objeto = {}
        cabeceras.forEach((cabecera, index) => {
          objeto[cabecera] = valores[index] || ''
        })
        return objeto
      })

      this.mostrarDatos()
      return this.datos
    } catch (error) {
      console.error('Error al obtener datos:', error)
    }
  }

  mostrarDatos() {
    const app = document.querySelector('#app')
    app.innerHTML = `
      <div class="contenedor">
        <h1>Datos del Sheet</h1>
        <input 
          type="text" 
          id="buscador" 
          placeholder="Buscar por nombre..."
          class="buscador"
        >
        <div id="resultados" class="resultados"></div>
      </div>
    `

    const buscador = document.querySelector('#buscador')
    buscador.addEventListener('input', (e) => this.filtrarDatos(e.target.value))
    
    this.actualizarResultados(this.datos)
  }

  filtrarDatos(texto) {
    if (!this.datos.length) return
    const filtrados = this.datos.filter(item => {
      // Obtenemos el nombre de la segunda columna (asumiendo que es la B)
      const nombreColumnaB = Object.keys(item)[1] || ""; // índice 1 para la columna B
      return item[nombreColumnaB].toLowerCase().includes(texto.toLowerCase());
    });

    this.actualizarResultados(filtrados)
  }

  actualizarResultados(datos) {
    const resultados = document.querySelector('#resultados')
    if (datos.length === 0) {
      resultados.innerHTML = "<p>No hay datos disponibles</p>"
      return
    }
    // Crear tabla
    resultados.innerHTML = `
      <table class="tabla-datos">
        <thead>
          <tr>
            ${Object.keys(datos[0])
              .slice(1, 3) // Tomamos solo la segunda y tercera columna (B y C)
              .map(columna => `<th>${columna}</th>`)
              .join('')}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${datos.map(fila => `
            <tr>
              ${Object.values(fila)
                .slice(1, 3) // Tomamos solo la segunda y tercera columna (B y C)
                .map(valor => `<td>${valor}</td>`)
                .join('')}
              <td>
                <button class="btn-detalles" onclick="window.location.href='DetallesRespuesta.html?dato=${encodeURIComponent(Object.values(fila)[1])}'">
                  Mostrar Detalles
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
  }
}
const lector = new LectorSheets()
document.addEventListener('DOMContentLoaded', () => {
  lector.obtenerDatos()
})