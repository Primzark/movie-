
const jsonUrl = 'data.json';


async function loadFilms() {
  try {
    
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données');
    }
    const data = await response.json();

    
    const filmsContainer = document.getElementById('films-container');
    filmsContainer.innerHTML = ''; 

    data.results.forEach(film => {
      
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

      
      filmsContainer.innerHTML += filmCard;
    });
  } catch (error) {
    console.error('Erreur:', error);
  }
}


loadFilms();