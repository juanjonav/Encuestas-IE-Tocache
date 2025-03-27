document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('socioeconomicoForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener los datos del formulario
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());
    
    try {
      // Aquí irá la lógica para enviar los datos a Google Sheets
      const SHEET_ID = 'TU_SHEET_ID'; // Reemplazar con tu ID de Google Sheets
      const url = `https://script.google.com/macros/s/AKfycbz.../exec`; // URL de tu Google Apps Script
      
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Datos guardados correctamente');
        form.reset();
      } else {
        throw new Error('Error al guardar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar los datos. Por favor, intente nuevamente.');
    }
  });
}); 