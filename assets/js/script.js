const apiKey = 'cc2b277c4ae3f78c456aef4691c0a1e0';
const jsonUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const searchUrl = query =>
  `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;

function renderFilms(data) {
  const featuredPoster = document.getElementById('featured-poster');
  const featuredTitle = document.getElementById('featured-title');
  const featuredRelease = document.getElementById('featured-release');
  const featuredVote = document.getElementById('featured-vote');
  const featuredOverview = document.getElementById('featured-overview');
  const featuredSection = document.getElementById('featured-section');
  const filmsContainer = document.getElementById('films-container');
  filmsContainer.innerHTML = '';

  const featured = data.results[0];
  if (featured) {
    featuredPoster.src = `https://image.tmdb.org/t/p/w500${featured.poster_path}`;
    featuredPoster.alt = featured.title;
    featuredTitle.textContent = featured.title;
    featuredRelease.textContent = `Release date: ${featured.release_date}`;
    featuredVote.textContent = `Average vote: ${featured.vote_average}/10`;
    if (featured.overview) {
      featuredOverview.textContent = featured.overview;
      featuredOverview.style.display = '';
    } else {
      featuredOverview.style.display = 'none';
    }
    featuredSection.onclick = () => {
      window.location.href = `movie.html?id=${featured.id}`;
    };
  }

  data.results.forEach(film => {
    const template = document.getElementById('film-template');
    const filmCard = template.content.cloneNode(true);
    const cardElem = filmCard.querySelector('.film-card');
    const img = filmCard.querySelector('img');
    img.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
    img.alt = film.title;
    filmCard.querySelector('h2').textContent = film.title;
    filmCard.querySelector('.release-date').textContent = `Date de sortie: ${film.release_date}`;
    filmCard.querySelector('.vote-average').textContent = `Note moyenne: ${film.vote_average}/10`;
    cardElem.onclick = () => {
      window.location.href = `movie.html?id=${film.id}`;
    };
    filmsContainer.appendChild(filmCard);
  });
}

function loadFilms() {
  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      return response.json();
    })
    .then(renderFilms)
    .catch(error => {
      console.error('Erreur:', error);
    });
}

function searchMovies(query) {
  const url = searchUrl(query);
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Erreur lors de la recherche');
      }
      return res.json();
    })
    .then(renderFilms)
    .catch(err => console.error(err));
}

document.getElementById('search-form').addEventListener('submit', e => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    searchMovies(query);
  } else {
    loadFilms();
  }
});

// Exécuter la fonction au chargement de la page
loadFilms();
