const pageLocation = {
    currentPage: window.location.pathname
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
            console.log('Home');
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