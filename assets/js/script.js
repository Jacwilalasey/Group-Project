$(document).ready(function () {

    console.log('hello world')

    // Global Variables

    let url = 'http://www.omdbapi.com/?s=';
    let url2 = 'http://www.omdbapi.com/?i=';
    let url3 = 'http://www.omdbapi.com/?t=';
    let apiKey = "1fcd68b1&";
    let imageDiv = $(".movie-image");
    let movieInfo = $(".current-movie-data")
    let searchedMovieDrop = $("#populate-searches")

    //  Renders searched movie posters to page

    function renderSearch(data) {

        searchedMovieDrop.empty()

        for (let i = 0; i < 5; i++) {
            let poster = $('<img>').attr('src', data[i].Poster);
            poster.addClass('img-search');
            // let titleType = $('<span>').text(`${data[i].Title} / ${data[i].Type}`);
            let moreInfo = $('<button>').text('More Info');
            moreInfo.attr('data-id', data[i].imdbID);
            moreInfo.addClass('more-info-button', 'button')
            let searchedMovie = $('<div>');
            searchedMovie.addClass('inline');

            searchedMovie.append(poster, moreInfo);

            searchedMovieDrop.append(searchedMovie);
            
            searchedMovie.click(function(event){
                event.preventDefault();
                movieData.call(moreInfo[0], event);
            });
        }
    };

    // Renders movie information to page

    function renderMovieInfo(data) {

        imageDiv.empty();
        movieInfo.empty();

        let poster = $('<img>').attr('src', data.Poster);
        poster.addClass('img-main');
        let title = $('<h1>').text(data.Title);
        let released = $('<h4>').text(`Released: ${data.Released}`);
        let genre = $('<h4>').text(`Genre: ${data.Genre}`);
        let plot = $('<p>').text(`"${data.Plot}"`);
        plot.css("font-style", "italic");
        let director = $('<h4>').text(`Director: ${data.Director}`);
        let boxOffice = $('<h4>').text(`Box Office Sales: ${data.BoxOffice}`);

        imageDiv.append(poster);
        movieInfo.append(title, plot, released, genre, director, boxOffice)

    };
    // search function

    $("#search-button").click(function (event) {
        event.preventDefault();
        imageDiv.empty();
        movieInfo.empty();
        let searchInput = $('#movie-input').val().trim()
        let queryUrl = `${url}${searchInput}&apikey=${apiKey}`;

        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {

                let search = response.Search
                console.log(search)
                renderSearch(search);
            });
    });

        // movie data function

        function movieData() {
            $("#movie-input").val("");
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
        "Wolf of Wall Street",
        "Hateful Eight",
        "The Incredible Hulk",
        "The Avengers",
        "Iron Man",
        "The Avengers: Infinity War",
        "The Avengers: Endgame"
    ];

    // Assigned all movie buttons to a variable 

    let genreBtn = $(".randomButton");

    // Function to pick a random movie from the array and append to the button
    function displayMovieInfo(movieTitle){
        let url = `${url3}${movieTitle}&apikey=${apiKey}`;
        $.ajax({
            url: url,
            method: 'GET'
        }).then(function(data){
            console.log(data);
            $('.movie-image').html(`<img src="${data.Poster}" alt="${movieTitle} poster">`);
            $('.current-movie-data').html(`
            <h2 style='text-align: left'>${data.Title}</h2>
            <p style='text-align: left'><strong>Plot: </strong><i>"${data.Plot}"</i></p>
            <p style='text-align: left'><strong>Director: </strong>${data.Director}</p>
            <p style='text-align: left'><strong>Release Year: </strong>${data.Year}</p>
            <p style='text-align: left'><strong>Language: </strong>${data.Language}</p>
            <p style='text-align: left'><strong>Awards: </strong>${data.Awards}</p>
            <p style='text-align: left'><strong>Runtime: </strong>${data.Runtime}</p>
            <p style='text-align: left'><strong>Genre: </strong>${data.Genre}</p>
            <p style='text-align: left'><strong>Actors: </strong>${data.Actors}</p>
            <p style='text-align: left'><strong>IMBd Rating: </strong>${data.imdbRating}</p>
            `);

           
        
        });
    }
    // const defaultMovieTitle = "The Incredible Hulk";
    // displayMovieInfo(defaultMovieTitle);
    $('.randomButton').click(function(){
        $("#movie-input").val("");
        const movieTitle = $(this).html();
        displayMovieInfo(movieTitle);
    });

    // Array to keep track of movies that have already been appended to the buttons
    let usedMovies = [];

    // Function to pick a random movie from the array and append to the button
    function randomise() {
        // if all movies have been used, reset the usedMovies array back to an empty array
        if(usedMovies.length === randomMovie.length){
            usedMovies=[];
        }
        for (let i = 0; i < genreBtn.length; i++) {
            let movie = randomMovie[Math.floor(Math.random() * randomMovie.length)];

            // If the movie has already been used, pick another movie
            if (usedMovies.includes(movie)) {
                // exit condition for the function so that it will not continue to call itself infinitely
                if(usedMovies.length < randomMovie.length){
                    randomise();
                }
               
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