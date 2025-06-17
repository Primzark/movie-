const apiKey = 'cc2b277c4ae3f78c456aef4691c0a1e0';

function getMovieId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadMovie() {
    const movieId = getMovieId();
    if (!movieId) return;

    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
    const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    Promise.all([
        fetch(detailsUrl),
        fetch(creditsUrl),
        fetch(videosUrl)
    ])
        .then(async ([detailsRes, creditsRes, videosRes]) => {
            if (!detailsRes.ok || !creditsRes.ok || !videosRes.ok) {
                throw new Error('Failed to load movie');
            }

            const movie = await detailsRes.json();
            const credits = await creditsRes.json();
            const videos = await videosRes.json();

            const poster = document.getElementById('detail-poster');
            const title = document.getElementById('detail-title');
            const release = document.getElementById('detail-release');
            const vote = document.getElementById('detail-vote');
            const overview = document.getElementById('detail-overview');
            const runtime = document.getElementById('detail-runtime');
            const tagline = document.getElementById('detail-tagline');
            const castList = document.getElementById('cast-list');
            const trailerContainer = document.getElementById('trailer-container');

            poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.alt = movie.title;
            title.textContent = movie.title;
            release.textContent = `Release date: ${movie.release_date}`;
            vote.textContent = `Average vote: ${movie.vote_average}/10`;
            overview.textContent = movie.overview;
            runtime.textContent = movie.runtime ? `Runtime: ${movie.runtime} min` : '';
            tagline.textContent = movie.tagline || '';

            castList.innerHTML = '';
            credits.cast.slice(0, 5).forEach(member => {
                const li = document.createElement('li');
                li.textContent = `${member.name} as ${member.character}`;
                castList.appendChild(li);
            });

            trailerContainer.innerHTML = '';
            const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
            if (trailer) {
                const iframe = document.createElement('iframe');
                iframe.width = '560';
                iframe.height = '315';
                iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                iframe.allowFullscreen = true;
                iframe.title = 'Trailer';
                trailerContainer.appendChild(iframe);
            }
        })
        .catch(err => console.error(err));
}

loadMovie();