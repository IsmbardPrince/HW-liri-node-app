// Load any necessary node packages for this module
//var request = require('request'); // OMDB access
//var spotify = require('spotify'); // Spotify access
//var twitter = require('twitter'); // Twitter access
var fs = require('fs'); // File system access

// Import any necessary local packages for this module
var twitsvc = require("./twitsvc.js"); // Twitter service object
var spotsvc = require("./spotsvc.js"); // Spotify service object
var omdbsvc = require("./omdbsvc.js"); // OMDB service object
var keys = require("./keys.js"); // Twitter authentication keys
var log = require("./log.js"); // Logging service object

//console.log(keys.twitterKeys.consumer_key);
//console.log(keys.twitterKeys.consumer_secret);
//console.log(keys.twitterKeys.access_token_key);
//console.log(keys.twitterKeys.access_token_secret);

// Module vars for the service objects
var svcTwitter; // Twitter
var svcSpotify; // Spotify
var svcOMDB; // OMDB
var svcLog; // App logging

// Instantiate the app logging service
svcLog = new log.LogSvc("log.txt");

// Get the command for this app invocation
var cmd = process.argv[2];

// and the optional parameter
var param = process.argv[3];

// loop exists mainly to handle the case where a command is specified in a file
while (typeof cmd !== "undefined" && cmd.length > 0) {

    // Process the command appropriately
    switch (cmd) {

        // List Tweets
        case "my-tweets":

            // create the Twitter service object
            svcTwitter = new twitsvc.TwitSvc(keys.twitterKeys.consumer_key,
                keys.twitterKeys.consumer_secret,
                keys.twitterKeys.access_token_key,
                keys.twitterKeys.access_token_secret);

            // output a header for the results
            console.log("\nCommand: " + cmd + "\n---------- Results: Last 20 tweets for IsmbardPrince, Latest > Earliest ----------");

            // output the tweet list, also logging it if logging was specified
            if (typeof svcLog !== "undefined") {
                svcLog.log("\n\nCommand: " + cmd + "\n---------- Results: Last 20 tweets for IsmbardPrince, Latest > Earliest ----------");
                svcTwitter.getTweets("IsmbardPrince", 20, svcLog);
            } else {
                svcTwitter.getTweets("IsmbardPrince", 20);
            }

            cmd = "";

            break;

        // Get Spotify song info
        case "spotify-this-song":

            // get the track name if one is specified, otherwise use the default track name
            if (typeof param !== "undefined") {
                var namTrack = param;
            } else {
                var namTrack = "The Sign";
            }

            // create the Spotify service object
            svcSpotify = new spotsvc.SpotSvc();

            // output a header for the results
            console.log("\nCommand: " + cmd + "\n---------- Results: Spotify Track Info for " + namTrack + " ----------");

            // output the track info, also logging it if logging was specified
            if (typeof svcLog !== "undefined") {
                svcLog.log("\n\nCommand: " + cmd + "\n---------- Results: Spotify Track Info for " + namTrack + " ----------");
                svcSpotify.getTrackInfo(namTrack, svcLog);
            } else {
                svcSpotify.getTrackInfo(namTrack);
            }

            cmd = "";

            break;

        // Get OMDB movie info
        case "movie-this":

            // get the movie name if one is specified, otherwise use the default movie name
            if (typeof param !== "undefined") {
                var namMovie = param;
            } else {
                var namMovie = "Mr. Nobody";
            }

            // create the OMDB service object
            svcOMDB = new omdbsvc.OMDBSvc();

            // output a header for the results
            console.log("\nCommand: " + cmd + "\n---------- Results: OMDB Movie Info for " + namMovie + " ----------");

            // output the movie info, also logging it if logging was specified
            if (typeof svcLog !== "undefined") {
                svcLog.log("\n\nCommand: " + cmd + "\n---------- Results: OMDB Movie Info for " + namMovie + " ----------");
                svcOMDB.getMovieInfo(namMovie, svcLog);
            } else {
                svcSpotify.getMovieInfo(namMovie);
            }

            cmd = "";

            break;

        // Get command to process from a file
        case "do-what-it-says":

            // set the app command and optional parameter from the contents of the specified file
            getCmdFromFile("random.txt");

            break;

        // Unknown command encountered
        default:
            console.log("I'm sorry, I don't understand the command: '" + cmd + "'");

            cmd = "";

    }

}

// getCmdFromFile(file)
// Sets the app command and optional parameter from the contents of the specified file
function getCmdFromFile(file) {

    // read the command and parameter from the file and set them for the app
    var arryCmd = fs.readFileSync(file, { encoding: 'utf8' }).trim().split(",");
    cmd = arryCmd[0];
    param = arryCmd[1];

}