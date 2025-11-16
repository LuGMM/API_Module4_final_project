const theatreInvisible = document.querySelector('.movie-theatre--img')
const loading = document.querySelector('.fa-spinner')
const resultsDisplay = document.querySelector('.movies__search')
const searchBtn = document.querySelector('.fa-search')
const catchError = document.querySelector('.error')


function homeRefresh() {
    window.location.reload()
}

async function searchMovie(event) {
     let oops = false     
     if (oops = true) {
        oops = false
        catchError.classList += " invisible"
     }

    try {
    theatreInvisible.classList += " invisible"
    loading.classList.remove("invisible")
    searchBtn.classList += " invisible"
    

    await moviesPromise()

    loading.classList += " invisible"
    resultsDisplay.classList.remove("invisible")
    searchBtn.classList.remove("invisible")}
    catch {
        oops = true
        theatreInvisible.classList += ' invisible'
        catchError.classList.remove('invisible')
        searchBtn.classList.remove("invisible")
        loading.classList += " invisible"
        resultsDisplay.classList += " invisible"
    }

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

async function moviesPromise() {
    const searchInput = document.querySelector('.search__text')
    const searchText = searchInput.value

    const moviesApi = await fetch (`https://www.omdbapi.com/?apikey=7ff2cb9c&s=${searchText}`)
    const moviesData = await moviesApi.json()

    const searchResults = (moviesData.Search)
    const moviesList = document.querySelector('.movies')

    moviesList.innerHTML = searchResults.map((film) => moviesHtml(film)).slice(0, 6).join("")
}


async function orderSearch(filter) {
    const searchInput = document.querySelector('.search__text')
    const searchText = searchInput.value

    const moviesApi = await fetch (`https://www.omdbapi.com/?apikey=7ff2cb9c&s=${searchText}`)
    const moviesData = await moviesApi.json()

    const searchResults = (moviesData.Search).slice(0, 6)
    let moviesList = document.querySelector('.movies')

    if (filter === "LOW_TO_HIGH") {
    searchResults.sort((a,b) => a.Year - b.Year)
    }
    else if (filter === "HIGH_TO_LOW") {
    const sortedResults = searchResults.sort((a,b) => a.Year - b.Year)
    sortedResults.reverse()    
    }

    moviesList.innerHTML = searchResults.map((film) => moviesHtml(film)).join("")
}

function filterSearch(event) {
    orderSearch(event.target.value)
}
