const form = document.getElementById('form');
const url = 'https://www.omdbapi.com/';
const apiKey = '332a3ad3';
const moviesContainer = document.getElementById('movie-container');

function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const searchedMovieName = formData.get("search-movie-input");

    fetch(`${url}?apikey=${apiKey}&t=${searchedMovieName}`)
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status : ${response.status}`)
        }
            return response.json()
        })
    .then(data => {
        if(data.Response === "False") {
            throw new Error("Invalid or incomplete movie data.")
        }

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="individual-movie-card">
                    <img class="movie-poster" src=${data.Poster} alt="Movie poster" />
                    <div class="movie-details">
                        <div class="movie-name-rating">
                            <h2>${data.Title}</h2>
                            <h3><img src="./assets/star.png" alt="image of star movie rating" class="star-symbol">${data.imdbRating}</h3>
                        </div>
                        <div class="movie-hours-genre">
                            <h3>${data.Runtime}</h3>
                            <h3>${data.Genre}</h3>
                            <button class="add-button" aria-label="Click to add movie to watchlist"><img src="./assets/add.png" class="add-symbol" 
                                alt="add to watchlist">Watchlist</button>
                        </div>
                        <p class="movie-story">${data.Plot}
                        </p>
                    </div>
                </div> `
       moviesContainer.append(newDiv);
       form.reset()
    
       const addButton = newDiv.querySelector('.add-button');

       addButton.addEventListener('click', () => {
        const storedMovies = JSON.parse(localStorage.getItem('watchlist')) || [];

        const alreadyAdded = storedMovies.some(movie => movie.imdbID === data.imdbID);
        if(alreadyAdded) {
            alert(`${data.Title} is already in your watchlist!`);
            return ;
        }
        storedMovies.push(data);

        localStorage.setItem('watchlist', JSON.stringify(storedMovies))

        alert(`${data.Title} added to your watchlist!`)
       })
    })
}

form.addEventListener('submit', (e) => handleSubmit(e));