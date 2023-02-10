$(document).ready(function () {

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

        let divA = $('<div>').attr('id', 'cover');
        let divB = $('<div>').addClass('column');


        let poster = $('<img>').attr('src', data.Poster);
        let title = $('<h2>').text(data.Title);
        let released = $('<h4>').text(`Released: ${data.Released}`);
        let genre = $('<h4>').text(`Genre: ${data.Genre}`);
        let plot = $('p>').text(`Plot: ${data.Plot}`);
        let director = $('<h4>').text(`Director: ${data.Director}`);
        let boxOffice = $('<h4>').text(`Box Office Sales: ${data.Boxoffice}`);

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
});

//  trying to get the randomise function working, also need the buttons populated randomly on load 

// let randGenres = [
//     "Action",
//     "Comedy",
//     "Thriller",
//     "Romance",
//     "Sci-Fi",
//     "Animation",
//     "Documentary",
//     "Anime",
//     "True Crime",
//     "Drama",
//     "Horror",
// ];

// let genreBtn = document.getElementById("genre-btn");

// function randomise() {
//     genreBtn.innerHTML = randGenres[Math.floor(Math.random() * randGenres.length)];
// };
