// Load any necessary node packages for this module
var request = require('request'); // http request support

// new OMDBSvc()
// Constructor for the OMDB service object
// This object utilizes the request node package to make calls to the OMDB web API.
var OMDBSvc = function () {

    // OMDBSvc.getMovieInfo(movie, log)
    // Displays info from OMDB regarding the specified movie
    //  movie - the name of the movie to get info for
    //  log - if a log object is provided the list will also be logged in addition to being displayed
    this.getMovieInfo = function (movie, log) {

        // process any spaces that might be in the movie name so OMDB can parse it correctly
        movie = movie.replace(/\s/g, "+");

        // construct the query url for the info request
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&type=movie&y=&plot=short&r=json&tomatoes=true";

        // get the OMDB info for the movie
        request(queryURL, function (error, response, body) {
            // if no error, then process the info from the Spotify response
            if (!error && response.statusCode == 200) {
                // console.log(JSON.stringify(body, null, 2));
                // output the OMDB movie info
                var b = JSON.parse(body);
                console.log("Movie Title: " + b.Title);
                console.log("Year Released: " + b.Year);
                console.log("IMDB Rating: " + b.imdbRating);
                console.log("Produced in: " + b.Country);
                console.log("Main Language: " + b.Language);
                console.log("Plot: " + b.Plot);
                console.log("Actors: " + b.Actors);
                console.log("Rotten Tomatoes Rating: " + b.tomatoRating);
                console.log("Rotten Tomatoes URL: " + b.tomatoURL);
                // log the output too if a log object is provided
                if (typeof log !== "undefined") {
                    log.log("\nMovie Title: " + b.Title);
                    log.log("\nYear Released: " + b.Year);
                    log.log("\nIMDB Rating: " + b.imdbRating);
                    log.log("\nProduced in: " + b.Country);
                    log.log("\nMain Language: " + b.Language);
                    log.log("\nPlot: " + b.Plot);
                    log.log("\nActors: " + b.Actors);
                    log.log("\nRotten Tomatoes Rating: " + b.tomatoRating);
                    log.log("\nRotten Tomatoes URL: " + b.tomatoURL);
                }
            // if OMDB returned an error, handle it
            } else {
                console.log("Error encountered when retrieving OMDB info.");
                console.log(JSON.stringify(err, null, 2));
            }

        });
    }

    // init()
    // Initialization function executed during instance construction
    function init() {

    }

    self = this; // convenience variable

    // initialize the instance before returning
    init();

}

// export the constructor
exports.OMDBSvc = OMDBSvc;