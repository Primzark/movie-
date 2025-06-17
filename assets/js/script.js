const apiKey = 'cc2b277c4ae3f78c456aef4691c0a1e0';
const jsonUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

function loadFilms() {
  // Fetch the list of popular movies from TMDB
  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      return response.json();
    })
    .then(data => {
      const filmsContainer = document.getElementById('films-container');
      filmsContainer.innerHTML = '';

      // Create and insert one card per movie
      data.results.forEach(film => {
        const template = document.getElementById('film-template');
        const filmCard = template.content.cloneNode(true);
        const img = filmCard.querySelector('img');
        img.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        img.alt = film.title;
        filmCard.querySelector('h2').textContent = film.title;
        filmCard.querySelector('.release-date').textContent = `Date de sortie: ${film.release_date}`;
        filmCard.querySelector('.vote-average').textContent = `Note moyenne: ${film.vote_average}/10`;
        filmsContainer.appendChild(filmCard);
      });
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
}

// Run the function on page load
loadFilms();
