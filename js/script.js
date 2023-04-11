const pageLocation = {
    currentPage: window.location.pathname
}

// Display popular movie
async function displayPopularMovies() {
    const { results } = await fetchApiData('movie/popular')

    results.forEach(movie => {
        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                alt="${movie.title}"
                class="card-img-top">`
                : `<img src="../images/no-image.jpg" 
                alt="${movie.title}"
                class="card-img-top">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Resale: ${movie.release_date}</small>
            </p>
          </div>
        `

        document.querySelector('#popular-movies').appendChild(card)
    })
}

// Display popular shows
async function displayPopularShows() {
    const { results } = await fetchApiData('tv/popular')

    results.forEach(show => {
        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${show.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" 
                alt="${show.name}"
                class="card-img-top">`
                : `<img src="../images/no-image.jpg" 
                alt="${show.name}"
                class="card-img-top">`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `

        document.querySelector('#popular-shows').appendChild(card)
    })
}

// Display movie Details

async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1]

    const movie = await fetchApiData(`movie/${movieId}`)

    // overlay for background image

    displayBackgroundImage('movie', movie.backdrop_path)

    const div = document.createElement('div')

    div.innerHTML = `
    <div class="details-top">
    <div>
      ${movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        alt="${movie.title}"
        class="card-img-top">`
            : `<img src="../images/no-image.jpg" 
        alt="${movie.title}"
        class="card-img-top">`
        }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Relase Date: ${movie.release_date}</p>
      <p>${movie.overview}</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget: $${addCommasToNum(movie.budget)}</span></li>
      <li><span class="text-secondary">Revenue: $${addCommasToNum(movie.revenue)}</span></li>
      <li><span class="text-secondary">Runtime: ${movie.runtime} minutes</span></li>
      <li><span class="text-secondary">Status: ${movie.status}</span></li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies
            .map(company => `<span>${company.name}</span>`)
            .join(', ')}
    </div>
  </div>
    `
    document.querySelector('#movie-details').appendChild(div)
}

// Display Show Details

async function displayShowDetails() {
    const showId = window.location.search.split('=')[1]

    const show = await fetchApiData(`tv/${showId}`)

    // overlay for background image

    displayBackgroundImage('tv', show.backdrop_path)

    const div = document.createElement('div')

    div.innerHTML = `
    <div class="details-top">
    <div>
      ${movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        alt="${movie.title}"
        class="card-img-top">`
            : `<img src="../images/no-image.jpg" 
        alt="${movie.title}"
        class="card-img-top">`
        }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Relase Date: ${movie.release_date}</p>
      <p>${movie.overview}</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget: $${addCommasToNum(movie.budget)}</span></li>
      <li><span class="text-secondary">Revenue: $${addCommasToNum(movie.revenue)}</span></li>
      <li><span class="text-secondary">Runtime: ${movie.runtime} minutes</span></li>
      <li><span class="text-secondary">Status: ${movie.status}</span></li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies
            .map(company => `<span>${company.name}</span>`)
            .join(', ')}
    </div>
  </div>
    `
    document.querySelector('#show-details').appendChild(div)
}

// Display backdrop Details Pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv)
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv)
    }
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

function addCommasToNum(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// init app
function init() {
    switch (pageLocation.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails()
            break;
        case '/tv-details.html':
            displayShowDetails()
            break;
        case '/search.html':
            console.log('search');
            break;
    }

    activeLi()
}


// run function on page load.
document.addEventListener('DOMContentLoaded', init)