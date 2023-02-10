$(document).ready(function () {

  //  Array of movies to be randomised when page loads 

let randomMovie =  [
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
  "The Lord of the Rings: The Fellowship of the Ring",
  "The Lord of the Rings: The Two Towers",
  "The Lord of the Rings: The Return of the King",
  "The Incredible Hulk",
  "The Avengers",
  "The Avengers: Age of Ultron",
  "The Avengers: Infinity War",
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


  // Global Variables

  let url = "https://movie-database-alternative.p.rapidapi.com/";
  let apiKey = "e63e384093mshf6ec0c8a4eb5556p1c46afjsn531a89eba378";
  let imageDiv = $("#genre-populate");
  imageDiv.append('hello');

  // Renders movie posters to page

  function renderImages(data) {

      imageDiv.empty()
      link = "www.google.com";

      for (let i = 0; i < data.length; i++) {
          let posters = data[i].Poster;
          let title = data[i].Title;
          let description = data[i].Type;
          var card = "<div class='col-sm-3 mb-2'>" +
              "<div class='card'>" +
              "<img src='" + posters + "' class='card-img-top' alt='Image'>" +
              "<div class='card-body'>" +
              "<h5 class='card-title'>" + title + "</h5>" +
              "<p class='card-text'>" + description + "</p>" +
              "<a href='" + link + "' class='btn btn-primary'>Learn More</a>" +
              "</div>" +
              "</div>" +
              "</div>";

          imageDiv.append(card)

      }
  }


  //    genre button click funtion sets off image renders 

  $("button").click(function () {

      var buttonId = $(this).attr("id");
      let queryUrl = `${url}?s=${buttonId}&r=json&page=1`;

      const settings = {
          "async": true,
          "crossDomain": true,
          "url": queryUrl,
          "method": "GET",
          "headers": {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com"
          }
      };

      $.ajax(settings).done(function (response) {
          let search = response.Search
          renderImages(search);
      })
  });

});


//  trying to get the randomise function working, also need the buttons populated randomly on load 

// let randomMovie = [

    console.log('hello world')

    // Global Variables

    let url = 'http://www.omdbapi.com/?s=';
    let url2 = 'http://www.omdbapi.com/?i='
    let apiKey = "1fcd68b1&";
    let imageDiv = $("#genre-populate");

    //  Renders searched movie posters to page

    function renderSearch(data) {

        imageDiv.empty()

        for (let i = 0; i < data.length; i++) {
            let poster = $('<img>').attr('src', data[i].Poster);
            let titleType = $('<h1>').text(`${data[i].Title} / ${data[i].Type}`);
            let moreInfo = $('<button>').text('More Info');
            moreInfo.attr('data-id', data[i].imdbID);
            moreInfo.addClass('more-info-button')
            let searchedMovie = $('<div>');
            searchedMovie.append(titleType, poster, moreInfo);

            imageDiv.append(searchedMovie)

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
        "The Lord of the Rings: The Fellowship of the Ring",
        "The Lord of the Rings: The Two Towers",
        "The Lord of the Rings: The Return of the King",
        "The Incredible Hulk",
        "The Avengers",
        "The Avengers: Age of Ultron",
        "The Avengers: Infinity War",
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


