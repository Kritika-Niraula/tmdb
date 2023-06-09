const apiBaseUrl = "https://api.themoviedb.org/3/";
const apiKey = "e7f5c912d9c2b7a8d9256f8de81e1573";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
const poster = $(".poster");
const columnCount = 4; 


function fetchData(endpoint) {
  return $.ajax({
    url: apiBaseUrl + endpoint,
    data: {
      api_key: apiKey
    }
  });
}


// for search bar

$(document).ready(function() {
  // Attach event handler to search button click
  $(".search-button").on("click", function(event) {
    event.preventDefault(); 
    searchMovies();
  });

  // Attach event handler to Enter key press
  $(".input").on("keypress", function(event) {
    if (event.which === 13) {
      event.preventDefault(); 
      searchMovies();
    }
  });

  // Function to handle movie search
  function searchMovies() {
    var query = $(".input").val(); 
    if (query !== "") {
      $.ajax({
        url: `${apiBaseUrl}/search/movie`,
        data: {
          api_key: apiKey,
          query: query
        },
        success: function(response) {
          const movies = response.results;
          displayMovies(movies); 
        },
        error: function(error) {
          console.error("Error:", error);
        }
      });
    }
  }

  // Function to display search results
  function displayMovies(movies) {
    
    $("#movie-list").empty();

    movies.forEach(function(movie) {
      $("<li>").text(movie.title).appendTo("#movie-list");
    });

    $("#movie-list").empty();
    
      movies.forEach(function(movie) {

        var movieContainer = $("<div>").addClass("movie-container");
    
        var movieInfo = $("<div>").addClass("movie-info");

        
       
        var poster = $("<img>").attr("src", imageBaseUrl + movie.poster_path).attr("alt", movie.title).addClass("movie-poster");
        movieContainer.append(poster);
        
        var title = $("<div>").text(movie.title).addClass("movie-title");
        movieInfo.append(title);
    
        
        var rating = $("<div>").html(' <i class="fa-solid fa-star"></i>' + movie.vote_average).addClass("movie-rating");
        movieInfo.append(rating);

        var overview = $("<div>").text(movie.overview).addClass("movie-overview");
        movieInfo.append(overview);
    
        movieContainer.append(movieInfo);
       
        $("#movie-list").append(movieContainer);
      });
    
  }
});


// for  whats streaming

const endpoint = "movie/popular";
fetchData(endpoint)
.then((data) => {
  displayData(data.results);
})
.fail((error) => {
  console.error("Error:", error);
});



function displayData(movies) {
  poster.empty();
  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numMovies = movies.length;
  var posterFlexList = [];

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  poster.append(flexContainer);

  function showMovie(index) {
    currentIndex = index;
    var column = currentIndex % columnCount;
  
    $.each(posterFlexList, function(i, posterFlex) {
      var movieIndex = (currentIndex + i) % numMovies;
      var movie = movies[movieIndex];
  
      var movieDesc = $('<div>').addClass('movies-desc');
      
      var movieRatings = $('<div>').addClass('movie-ratings');
      var ratingIcon = $('<div>').addClass('rating-icon').html('<i class="fa-solid fa-star"></i>');
      var averageRating = $('<div>').addClass('vote-average').text(movie.vote_average);
      movieRatings.append($('<div>').addClass('d-flex').append(ratingIcon, averageRating));
      
      var movieTitle = $('<div>').addClass('movie-title').text(movie.title);
      
      movieDesc.append(movieRatings, movieTitle);
  
      var img = $('<img>').attr('src', imageBaseUrl + movie.poster_path);
      posterFlex.empty().append(img, movieDesc);
    });
  }
  

  // Previous button click event
  $("#prev-btn").on("click", function() {
    currentIndex = (currentIndex - columnCount + numMovies) % numMovies;
    showMovie(currentIndex);
  });

  // Next button click event
  $("#next-btn").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numMovies;
    showMovie(currentIndex);
  });

  showMovie(currentIndex);
}



// for coming soon in theateres

function fetchComingSoon() {
  $.ajax({
    url: `${apiBaseUrl}movie/upcoming`,
    data: {
      api_key: apiKey
    },
    success: function(response) {
      const comingSoon = response.results;
      displayComingSoon(comingSoon);
    },
    error: function(error) {
      console.error("Error:", error);
    }
  });
}

function displayComingSoon(comingSoon) {
  var comingSoonContainer = $(".coming-soon");
  comingSoonContainer.empty();

  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numComingSoon = comingSoon.length;
  var posterFlexList = [];

  var columnCount = 4;

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  comingSoonContainer.append(flexContainer);

  function showMovie(index) {
    currentIndex = index;

    $.each(posterFlexList, function(i, posterFlex) {
      var comingSoonIndex = (currentIndex + i) % numComingSoon;
      var movie = comingSoon[comingSoonIndex];

      var movieContainer = $("<div>").addClass("poster-container");

      var img = $("<img>").attr("src", imageBaseUrl + movie.poster_path);

      var title = $("<div>").addClass("movietitle").text(movie.title);
      var rating = $("<div>").addClass("movierating").html('<i class="fa-solid fa-star"></i>' + movie.vote_average);

      movieContainer.append(img, rating, title);
      posterFlex.empty().append(movieContainer);
    });
  }

  // Previous button click event
  $("#rightbtn").on("click", function() {
    currentIndex = (currentIndex - columnCount + numComingSoon) % numComingSoon;
    showMovie(currentIndex);
  });

  // Next button click event
  $("#leftbtn").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numComingSoon;
    showMovie(currentIndex);
  });

  showMovie(currentIndex);
}

fetchComingSoon();


// for top rated

function fetchTopRated() {
  $.ajax({
    url: `${apiBaseUrl}movie/top_rated`,
    data: {
      api_key: apiKey
    },
    success: function(response) {
      const movies = response.results;
      displayTopRated(movies);
    },
    error: function(error) {
      console.error("Error:", error);
    }
  });
}

function displayTopRated(movies) {
  var posterContainer = $(".streaming-poster");
  posterContainer.empty();

  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numMovies = movies.length;
  var posterFlexList = [];

  var columnCount = 4;

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  posterContainer.append(flexContainer);

  function showMovie(index) {
    currentIndex = index;

    $.each(posterFlexList, function(i, posterFlex) {
      var movieIndex = (currentIndex + i) % numMovies;
      var movie = movies[movieIndex];

      var movieContainer = $("<div>").addClass("poster-container");
      

      var img = $("<img>").attr("src", imageBaseUrl + movie.poster_path);
      
      var title = $("<div>").addClass("movietitle").text(movie.title);
      var rating = $("<div>").addClass("movierating").html('<i class="fa-solid fa-star"></i>' + movie.vote_average);

      movieContainer.append(img, rating , title);
      posterFlex.empty().append(movieContainer);
    });
  }

  // Previous button click event
  $("#right-btn").on("click", function() {
    currentIndex = (currentIndex - columnCount + numMovies) % numMovies;
    showMovie(currentIndex);
  });

  // Next button click event
  $("#left-btn").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numMovies;
    showMovie(currentIndex);
  });

  showMovie(currentIndex);
}

fetchTopRated();

// for now playing
function fetchNowPlaying() {
  $.ajax({
    url: `${apiBaseUrl}movie/now_playing`,
    data: {
      api_key: apiKey
    },
    success: function(response) {
      const movies = response.results;
      displayNowPlaying(movies);
    },
    error: function(error) {
      console.error("Error:", error);
    }
  });
}

function displayNowPlaying(movies) {
  var posterContainer = $(".now-playing-container");
  posterContainer.empty();

  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numMovies = movies.length;
  var posterFlexList = [];

  var columnCount = 4;

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  posterContainer.append(flexContainer);

  function showMovie(index) {
    currentIndex = index;

    $.each(posterFlexList, function(i, posterFlex) {
      var movieIndex = (currentIndex + i) % numMovies;
      var movie = movies[movieIndex];

      var movieContainer = $("<div>").addClass("poster-container");
      
      var img = $("<img>").addClass("moviethumbnail").attr("src", imageBaseUrl + movie.poster_path);
      
      var title = $("<div>").addClass("movietitle").text(movie.title);
      var rating = $("<div>").addClass("movierating").html('<i class="fa-solid fa-star"></i>' + movie.vote_average);

      movieContainer.append(img, rating, title);
      posterFlex.empty().append(movieContainer);
    });
  }

  // Previous button click event
  $("#prev").on("click", function() {
    currentIndex = (currentIndex - columnCount + numMovies) % numMovies;
    showMovie(currentIndex);
  });

  // Next button click event
  $("#next").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numMovies;
    showMovie(currentIndex);
  });

  showMovie(currentIndex);
}

fetchNowPlaying();



// for popular tv shows

function fetchTopRatedTvShow() {
  $.ajax({
    url: `${apiBaseUrl}tv/top_rated`,
    data: {
      api_key: apiKey
    },
    success: function(response) {
      const tvShows = response.results;
      displayTopRatedTvShow(tvShows);
    },
    error: function(error) {
      console.error("Error:", error);
    }
  });
}

function displayTopRatedTvShow(tvShows) {
  var tvShowContainer = $(".tv-show-container");
  tvShowContainer.empty();

  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numTVShows = tvShows.length;
  var posterFlexList = [];

  var columnCount = 4;

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  tvShowContainer.append(flexContainer);

  function showTVShow(index) {
    currentIndex = index;

    $.each(posterFlexList, function(i, posterFlex) {
      var tvShowIndex = (currentIndex + i) % numTVShows;
      var tvShow = tvShows[tvShowIndex];

      var tvShowContainer = $("<div>").addClass("poster-container");
      
      var img = $("<img>").attr("src", imageBaseUrl + tvShow.poster_path);
      
      var title = $("<div>").addClass("movietitle").text(tvShow.name);
      var rating = $("<div>").addClass("movierating").html('<i class="fa-solid fa-star"></i>' + tvShow.vote_average);

      tvShowContainer.append(img, rating, title);
      posterFlex.empty().append(tvShowContainer);
    });
  }

  // Previous button click event
  $("#prevbtn").on("click", function() {
    currentIndex = (currentIndex - columnCount + numTVShows) % numTVShows;
    showTVShow(currentIndex);
  });

  // Next button click event
  $("#nextbtn").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numTVShows;
    showTVShow(currentIndex);
  });

  showTVShow(currentIndex);
}

fetchTopRatedTvShow();


// for popular persons
function fetchPopularPersons() {
  $.ajax({
    url: "https://api.themoviedb.org/3/person/popular",
    data: {
      api_key: apiKey
    },
    success: function(response) {
      const persons = response.results;
      displayPopularPersons(persons);
    },
    error: function(error) {
      console.error("Error:", error);
    }
  });
}

function displayPopularPersons(persons) {
  var posterContainer = $(".popular-persons");
  posterContainer.empty();

  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numPersons = persons.length;
  var posterFlexList = [];

  var columnCount = 4;

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  posterContainer.append(flexContainer);

  function showPerson(index) {
    currentIndex = index;

    $.each(posterFlexList, function(i, posterFlex) {
      var personIndex = (currentIndex + i) % numPersons;
      var person = persons[personIndex];

      var personContainer = $("<div>").addClass("poster-container");
      
      var img = $("<img>").attr("src", "https://image.tmdb.org/t/p/w500" + person.profile_path);
      
      var name = $("<div>").addClass("person-name").text(person.name);
      var popularity = $("<div>").addClass("person-popularity").text("Popularity: " + person.popularity);

      personContainer.append(img, popularity , name);
      posterFlex.empty().append(personContainer);
    });
  }

  //  button click event
  $("#popular-prev-btn").on("click", function() {
    currentIndex = (currentIndex - columnCount + numPersons) % numPersons;
    showPerson(currentIndex);
  });

  // Next button click event
  $("#popular-next-btn").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numPersons;
    showPerson(currentIndex);
  });

  showPerson(currentIndex);
}

fetchPopularPersons();



// for airing today tv show

function fetchAiringTodayTVShows() {
  $.ajax({
    url: `${apiBaseUrl}tv/on_the_air`,
    data: {
      api_key: apiKey
    },
    success: function(response) {
      const tvShows = response.results;
      displayAiringTodayTVShows(tvShows);
    },
    error: function(error) {
      console.error("Error:", error);
    }
  });
}

function displayAiringTodayTVShows(tvShows) {
  var tvShowContainer = $(".airing-poster");
  tvShowContainer.empty();

  var flexContainer = $('<div>').addClass('poster-flex-container');
  var currentIndex = 0;
  var numTVShows = tvShows.length;
  var posterFlexList = [];

  var columnCount = 4;

  for (var i = 0; i < columnCount; i++) {
    var posterFlex = $('<div>').addClass('poster-flex');
    flexContainer.append(posterFlex);
    posterFlexList.push(posterFlex);
  }

  tvShowContainer.append(flexContainer);

  function showTVShow(index) {
    currentIndex = index;

    $.each(posterFlexList, function(i, posterFlex) {
      var tvShowIndex = (currentIndex + i) % numTVShows;
      var tvShow = tvShows[tvShowIndex];

      var tvShowContainer = $("<div>").addClass("poster-container");
      
      var img = $("<img>").attr("src", imageBaseUrl + tvShow.poster_path);
      img.addClass("moviethumbnail");
      
      var title = $("<div>").addClass("movietitle").text(tvShow.name);
      var rating = $("<div>").addClass("movierating").html('<i class="fa-solid fa-star"></i>' + tvShow.vote_average);

      tvShowContainer.append(img, rating, title);
      posterFlex.empty().append(tvShowContainer);
    });
  }

  // Previous button click event
  $("#right").on("click", function() {
    currentIndex = (currentIndex - columnCount + numTVShows) % numTVShows;
    showTVShow(currentIndex);
  });

  // Next button click event
  $("#left").on("click", function() {
    currentIndex = (currentIndex + columnCount) % numTVShows;
    showTVShow(currentIndex);
  });

  showTVShow(currentIndex);
}

fetchAiringTodayTVShows();

//for plans toggle

function changeBorderColor(event) {
  const plan = $(event.currentTarget);
  const allPlans = $('.plans');

  allPlans.removeClass('clicked');

  plan.addClass('clicked');

  
}

