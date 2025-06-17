const apiKey = 'cc2b277c4ae3f78c456aef4691c0a1e0';
const jsonUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

function loadFilms() {
  // Récupère la liste des films populaires auprès de l'API TMDB
  fetch(jsonUrl)
    .then(response => {
      // Vérifie que la requête s'est bien passée
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      return response.json();
    })
    .then(data => {
      const filmsContainer = document.getElementById('films-container');
      filmsContainer.innerHTML = '';

      // Crée et ajoute une carte pour chaque film retourné
      data.results.forEach(film => {
        const filmCard = `
          <div class="col">
            <div class="film-card">
              <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
              <div class="film-info">
                <h2>${film.title}</h2>
                <p>Date de sortie: ${film.release_date}</p>
                <p>Note moyenne: ${film.vote_average}/10</p>
              </div>
            </div>
          </div>
        `;
        filmsContainer.innerHTML += filmCard;
      });
    })
    .catch(error => {
      // Affiche les erreurs dans la console pour faciliter le debug
      console.error('Erreur:', error);
    });
}

// Lance le chargement des films lors de l'exécution du script
loadFilms();