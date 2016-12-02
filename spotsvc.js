// Load any necessary node packages for this module
var spotify = require('spotify'); // Spotify access

// new SpotSvc()
// Constructor for the Spotify service object
// This object utilizes the Spotify node package to access the Spotify API.
var SpotSvc = function () {

    // SpotSvc.getTrackInfo(track, log)
    // Displays info from Spotify regarding the specified song
    //  track - the name of the track to get info for
    //  log - if a log object is provided the list will also be logged in addition to being displayed
    this.getTrackInfo = function (track, log) {

        // process any spaces that might be in the track name so Spotify can parse it correctly
        track = track.replace(/\s/g, "+");

        // get the spotify info for the track
        spotify.search({ type: 'track', query: '"' + track + '"' }, function (err, data) {
            // if no error, then process the info from the Spotify response
            if (!err) {
                // console.log(JSON.stringify(data, null, 2));
                // output the Spotify track info
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Link to audio preview: " + data.tracks.items[0].preview_url);
                // log the output too if a log object is provided
                if (typeof log !== "undefined") {
                    log.log("\nSong Name: " + data.tracks.items[0].name);
                    log.log("\nArtist(s): " + data.tracks.items[0].artists[0].name);
                    log.log("\nAlbum: " + data.tracks.items[0].album.name);
                    log.log("\nLink to audio preview: " + data.tracks.items[0].preview_url);
                }
            // if Spotify returned an error, handle it
            } else {
                console.log("Error encountered when retrieving Spotify info.");
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
exports.SpotSvc = SpotSvc;