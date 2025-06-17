const apiKey = 'cc2b277c4ae3f78c456aef4691c0a1e0';

function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadMovie() {
    const movieId = getMovieId();
    if (!movieId) return;

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load movie');
            return response.json();
        })
        .then(movie => {
            const poster = document.getElementById('detail-poster');
            const title = document.getElementById('detail-title');
            const release = document.getElementById('detail-release');
            const vote = document.getElementById('detail-vote');
            const overview = document.getElementById('detail-overview');

            poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.alt = movie.title;
            title.textContent = movie.title;
            release.textContent = `Release date: ${movie.release_date}`;
            vote.textContent = `Average vote: ${movie.vote_average}/10`;
            overview.textContent = movie.overview;
        })
        .catch(err => console.error(err));
}

loadMovie();