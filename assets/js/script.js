$(document).ready(function () {

    console.log('hello world')

    // Global Variables

    let url = 'http://www.omdbapi.com/?s=';
    let apiKey = "1fcd68b1&";
    let imageDiv = $("#genre-populate");

    //  Renders searched movie posters to page

    function renderSearch(data) {

        imageDiv.empty()
        link = "www.google.com";

        for (let i = 0; i < data.length; i++) {
            let poster = $('<img>').attr('src', data[i].Poster);
            let title = $('<h1>').text(data[i].Title);
            let type = $('<h2>').text(data[i].Type);
            let moreInfo = $('<button>').text('More Info');
            moreInfo.attr('data-id', data[i].imdbID);
            moreInfo.class('')
            let searchedMovie = $('<div>');
            searchedMovie.append(title, poster, type, moreInfo);

            imageDiv.append(searchedMovie)

        }
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
                console.log(response);

                let search = response.Search
                renderSearch(search);
            });



        //    genre button click funtion sets off image renders 

        // $("button").click(function () {

        //     var buttonId = $(this).attr("id");
        //     let queryUrl = `${url}?s=${buttonId}&r=json&page=1`;

        //     const settings = {
        //         "async": true,
        //         "crossDomain": true,
        //         "url": queryUrl,
        //         "method": "GET",
        //         "headers": {
        //             "X-RapidAPI-Key": apiKey,
        //             "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com"
        //         }
        //     };

        //     $.ajax(settings).done(function (response) {
        //         let search = response.Search
        //         renderImages(search);
        //     })
        // });

        // ty

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
