// URL du fichier JSON (à remplacer par l'URL réelle si nécessaire)
const jsonUrl = 'data.json';

// Fonction pour charger et afficher les films
async function loadFilms() {
  try {
    // Charger les données JSON
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données');
    }
    const data = await response.json();

    // Afficher les films
    const filmsContainer = document.getElementById('films-container');
    filmsContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter les films

    data.results.forEach(film => {
      // Créer une carte pour chaque film
      const filmCard = `
        <div class="film-card">
          <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
          <div class="film-info">
            <h2>${film.title}</h2>
            <p>Date de sortie: ${film.release_date}</p>
            <p>Note moyenne: ${film.vote_average}/10</p>
          </div>
        </div>
      `;

      // Ajouter la carte du film au conteneur
      filmsContainer.innerHTML += filmCard;
    });
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Charger les films au chargement de la page
loadFilms();