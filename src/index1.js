const watchListContainer = document.getElementById('watchlist-container');

const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
watchlist.forEach(movie => {
    const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="individual-movie-card">
                    <img class="movie-poster" src=${movie.Poster} alt="Movie poster" />
                    <div class="movie-details">
                        <div class="movie-name-rating">
                            <h2>${movie.Title}</h2>
                            <h3><img src="./assets/star.png" alt="image of star movie rating" class="star-symbol">${movie.imdbRating}</h3>
                        </div>
                        <div class="movie-hours-genre">
                            <h3>${movie.Runtime}</h3>
                            <h3>${movie.Genre}</h3>
                            <button class="minus-button" data-id=${movie.imdbID} aria-label="Click to remove movie from watchlist"><img src="./assets/minus.png" class="minus-symbol" 
                                alt="remove from watchlist">Remove</button>
                        </div>
                        <p class="movie-story">${movie.Plot}
                        </p>
                    </div>
                </div> `

            watchListContainer.append(newDiv);

            const minusButton = newDiv.querySelector('.minus-button');
            minusButton.addEventListener('click', () => {
            const storedMovies = JSON.parse(localStorage.getItem('watchlist'))
            const newMovieList = storedMovies.filter(data => movie.imdbID !== data.imdbID)
              localStorage.setItem('watchlist', JSON.stringify(newMovieList))
            alert(`${movie.Title} is removed from the watchlist!`)  
});

})

