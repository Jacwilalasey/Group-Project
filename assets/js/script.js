$(document).ready(function () {

  console.log('hello world')

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

  // ty

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


let genreBtn = document.querySelectorAll(".button");
console.log(genreBtn);

function randomise() {
// genreBtn.innerHTML = randGenres[Math.floor(Math.random() * randGenres.length)];

for (let i = 0; i < genreBtn.length; i++) {
  genreBtn[i].innerHTML = randGenres[Math.floor(Math.random() * randGenres.length)];
}
};

document.getElementById("random-btn").addEventListener("click", randomise);



// let genreBtn = document.getElementById("genre-btn");

// function randomise() {
//     genreBtn.innerHTML = randGenres[Math.floor(Math.random() * randGenres.length)];
// };

