class Navbar {
  constructor() {
    this.element = document.createElement('nav');
    this.element.className = 'navbar';
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="navbar-content">
        <a href="../vistas/index.html" class="navbar-brand">Ficha Socioeconómica</a>
        <div class="navbar-links">
          <a href="../vistas/formulario.html">Nuevo Registro</a>
          <a href="../vistas/index.html">Ver Registros</a>
        </div>
      </div>
    `;
  }

  mount(container) {
    container.appendChild(this.element);
  }
} 