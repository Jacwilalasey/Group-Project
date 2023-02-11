$(document).ready(function () {

    console.log('hello world')

    // Global Variables

    let url = 'http://www.omdbapi.com/?s=';
    let url2 = 'http://www.omdbapi.com/?i='
    let apiKey = "1fcd68b1&";
    let imageDiv = $("#genre-populate");
    let searchedMovieDrop = $("#populate-searches")

    //  Renders searched movie posters to page

    function renderSearch(data) {

        searchedMovieDrop.empty()

        for (let i = 0; i < 5; i++) {
            let poster = $('<img>').attr('src', data[i].Poster);
            let titleType = $('<span>').text(`${data[i].Title} / ${data[i].Type}`);
            let moreInfo = $('<button>').text('More Info');
            moreInfo.attr('data-id', data[i].imdbID);
            moreInfo.addClass('more-info-button', 'button')
            let searchedMovie = $('<div>');
            searchedMovie.addClass('inline');

            searchedMovie.append(poster, moreInfo);

            searchedMovieDrop.append(searchedMovie)

        }
    };

    // Renders movie information to page

    function renderMovieInfo(data) {

        imageDiv.empty()

        let poster = $('<img>').attr('src', data.Poster);
        let title = $('<h2>').text(data.Title);
        let released = $('<h4>').text(`Released: ${data.Released}`);
        let genre = $('<h4>').text(`Genre: ${data.Genre}`);
        let plot = $('p>').text(`Plot: ${data.Plot}`);
        let director = $('<h4>').text(`Director: ${data.Director}`);
        let boxOffice = $('<h4>').text(`Box Office Sales: ${data.BoxOffice}`);

        imageDiv.append(poster, title, released, genre, plot, director, boxOffice);

    };
    // search function

    $("#search-button").click(function (event) {
        event.preventDefault();
        let searchInput = $('#movie-input').val().trim()
        let queryUrl = `${url}${searchInput}&apikey=${apiKey}`;

        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {

                let search = response.Search
                renderSearch(search);
            });

        // movie data function

        function movieData(event) {
            event.preventDefault();
            var imdbID = $(this).attr("data-id");
            let queryUrl = `${url2}${imdbID}&apikey=${apiKey}`;

            console.log(imdbID);

            $.ajax({
                url: queryUrl,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);

                    renderMovieInfo(response);
                });

        };

        $(document).on("click", ".more-info-button", movieData);

    });

    // RANDOM MOVIE BUTTON GENERATOR

    // array of random movies

    let randomMovie = [
        "The Dark Knight",
        "Die Hard",
        "Raiders of the Lost Ark",
        "Lethal Weapon",
        "Terminator 2: Judgment Day",
        "RoboCop",
        "Aliens",
        "The Matrix",
        "The Matrix Reloaded",
        "The Matrix Revolutions",
        "The Terminator",
        "Gladiator",
        "Pulp Fiction",
        "Taxidermia ",
        "There Will Be Blood",
        "The Incredible Hulk",
        "The Avengers",
        "Trainspotting ",
        "A Clockwork Orange",
        "The Avengers: Endgame"
    ];

    // Assigned all movie buttons to a variable 

    let genreBtn = document.querySelectorAll(".randomButton");

    // Function to pick a random movie from the array and append to the button


    // Array to keep track of movies that have already been appended to the buttons
    let usedMovies = [];

    // Function to pick a random movie from the array and append to the button
    function randomise() {
        for (let i = 0; i < genreBtn.length; i++) {
            let movie = randomMovie[Math.floor(Math.random() * randomMovie.length)];

            if (usedMovies.includes(movie)) {
                // If the movie has already been used, pick another movie
                randomise();
            } else {
                // If the movie has not been used, append it to the button and add it to the usedMovies array
                genreBtn[i].innerHTML = movie;
                usedMovies.push(movie);
            }
        }
    }

    // called the function to pick a random movie from the array and append to the button when page loads
    randomise();

    // added event listener to the randomise button to randomly pick a movie from the array and append to each button
    document.getElementById("random-btn").addEventListener("click", randomise);

});
