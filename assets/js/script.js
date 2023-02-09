//  trying to get the randomise function working, also need the buttons populated randomly on load 

let randGenres = [
    "Action",
    "Comedy",
    "Thriller",
    "Romance",
    "Sci-Fi",
    "Animation",
    "Documentary",
    "Anime",
    "True Crime",
    "Drama",
    "Horror",
];

let genreBtn = document.getElementById("genre-btn");

function randomise() {
    genreBtn.innerHTML = randGenres[Math.floor(Math.random() * randGenres.length)];
};