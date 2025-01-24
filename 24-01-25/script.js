
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const contenedorTitulos = document.getElementById('contenedor-titulos');
const botonMostrarTitulos = document.getElementById('mostrar-titulos');

// Crear y agregar el botón de filtrar por género
const botonFiltrarGenero = document.createElement('button');
botonFiltrarGenero.textContent = 'Filtrar por Género';
botonFiltrarGenero.style.marginTop = '10px';
document.body.appendChild(botonFiltrarGenero);

// Cargar el JSON y mostrar las películas
fetch('peliculas.json')
  .then((response) => response.json())
  .then((data) => {
    // Guardar el JSON en una variable global para reutilizar
    window.peliculas = data;

    // Mostrar todas las películas
    let htmlContent = '';
    for (let i = 0; i < data.length; i++) {
      htmlContent += `<p><strong>${data[i].titulo}</strong> - Año: ${data[i].año}, Género: ${data[i].genero}</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
  });

// Mostrar solo los títulos de las películas
botonMostrarTitulos.addEventListener('click', () => {
  if (!window.peliculas) return;

  let htmlContent = '';
  for (let i = 0; i < window.peliculas.length; i++) {
    htmlContent += `<p>${window.peliculas[i].titulo}</p>`;
  }
  contenedorTitulos.innerHTML = htmlContent;
});

// Filtrar las películas por género
botonFiltrarGenero.addEventListener('click', () => {
  if (!window.peliculas) return;

  const generoBuscado = prompt('Ingresa el género que deseas filtrar (ejemplo: Animación, Acción, Ciencia Ficción):');
  if (!generoBuscado) return;

  const peliculasFiltradas = window.peliculas.filter(
    (pelicula) => pelicula.genero.toLowerCase() === generoBuscado.toLowerCase()
  );

  let htmlContent = '';
  if (peliculasFiltradas.length > 0) {
    peliculasFiltradas.forEach((pelicula) => {
      htmlContent += `<p><strong>${pelicula.titulo}</strong> - Año: ${pelicula.año}, Género: ${pelicula.genero}</p>`;
    });
  } else {
    htmlContent = `<p>No se encontraron películas del género: ${generoBuscado}</p>`;
  }
  contenedorPeliculas.innerHTML = htmlContent;
});
