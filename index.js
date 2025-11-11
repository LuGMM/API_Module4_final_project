async function searchMovie(event) {
    const searchInput = document.querySelector('.search__text')
    const searchText = searchInput.value
    const theatreInvisible = document.querySelector('.movie-theatre--img')
    const loading = document.querySelector('.fa-spinner')
    const resultsDisplay = document.querySelector('.movies__search')
    
    theatreInvisible.classList += " invisible"
    loading.classList.remove("invisible")
    
    const moviesApi = await fetch (`https://www.omdbapi.com/?apikey=7ff2cb9c&s=${searchText}`)
    const moviesData = await moviesApi.json()
    
    const searchResults = (moviesData.Search)
    const moviesList = document.querySelector('.movies')

    moviesList.innerHTML = searchResults.map((film) => moviesHtml(film)).slice(0, 6).join("")

    loading.classList += " invisible"
    resultsDisplay.classList.remove("invisible")
}

function moviesHtml (film) {
    return `<div class="movie">
                <figure class="movie__poster--wrapper">
                    <img src="${film.Poster}" alt="" class="movie__poster--img">
                </figure>
                <div class="movie__title">${film.Title}</div>
                <div class="movie__year">Release Year:${film.Year}</div>
            </div>`
}



