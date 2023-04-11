const pageLocation = {
    currentPage: window.location.pathname
}

async function displayPopularMovies() {
    const { results } = await fetchApiData('movie/popular')

    results.forEach(movie => {
        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                alt="Movie Title"
                class="card-img-top">`
                : `<img src="../images/no-image.jpg" 
                alt="${movie.title}"
                class="card-img-top">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Resale: ${movie.relase_date}</small>
            </p>
          </div>
        `

        document.querySelector('#popular-movies').appendChild(card)
    })
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
    const API_KEY = '8f28ca44b3ae15f44603c63265c7255e';
    const API_URL = 'https://api.themoviedb.org/3/'

    showSpinner()

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)

    const data = await response.json()

    hideSpinner()

    return data;
}

// Spinner

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

// Active nav link.
function activeLi() {
    const links = document.querySelectorAll('.nav-link')
    links.forEach(link => {
        if (link.getAttribute('href') === pageLocation.currentPage) {
            link.classList.add('active')
        }
    })
}

// init app
function init() {
    switch (pageLocation.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/show.html':
            console.log('Show');
            break;
        case '/movie-details.html':
            console.log('Movie');
            break;
        case '/tv-details.html':
            console.log('Tv');
            break;
        case '/search.html':
            console.log('search');
            break;
    }

    activeLi()
}


// run function on page load.
document.addEventListener('DOMContentLoaded', init)