// Load any necessary node packages for this module
var twitter = require('twitter'); // Twitter access
//var fs = require('fs'); // File system access

// new TwitSvc(consumer_key, consumer_secret, access_token_key, access_token_secret)
// Constructor for the Twitter service object
// This object utilizes the Twitter node package to access the Twitter API. The interface to that package
// is set up during instance construction and requires four pieces of data for the Twitter authentication
// process.
//      consumer_key - Twitter authentication value (required)
//      consumer_secret - Twitter authentication value (required)
//      access_token_key - Twitter authentication value (required)
//      access_token_secret - Twitter authentication value (required)
var TwitSvc = function (consumer_key, consumer_secret, access_token_key, access_token_secret) {
    
    // save the Twitter authentication values
	this.consumer_key = consumer_key,
	this.consumer_secret = consumer_secret,
	this.access_token_key = access_token_key,
	this.access_token_secret = access_token_secret,

    // TwitSvc.getTweets(tweeter, count, log)
    // Displays a list of a number of recent tweets by a specified account
    //  tweeter - the name of the account to list tweets from
    //  count - the number of tweets to list
    //  log - if a log object is provided the list will also be logged in addition to being displayed
        this.getTweets = function (tweeter, count, log) {

        // get the desired list of tweets from Twitter
        client.get("search/tweets", { q: "from:" + tweeter, result_type: "recent", count: count }, function (err, tweets, response) {

            // if no error, then process the info from the Twitter response
			if (!err) {
				// console.log(JSON.stringify(tweets, null, 2));
                // iterate through the Twitter JSON outputting each tweet's text and when it was sent
                for (var i = 0; i < tweets.statuses.length; i++) {
                    console.log("\n" + tweets.statuses[i].text + "\nsent at: " + tweets.statuses[i].created_at + " GMT\n");
                    // log the output too if a log object is provided
                    if (typeof log !== "undefined") {
					    log.log("\n" + tweets.statuses[i].text + "\nsent at: " + tweets.statuses[i].created_at + " GMT\n");
                    }
                }
            // if Twitter returned an error, handle it
			} else {
				console.log("Error encountered when retrieving tweets.");
				console.log(JSON.stringify(err, null, 2));
			}
		});
	}
    
    // instance variable referencing the Twitter node package
    var client;

    // init()
    // Initialization function executed during instance construction
	function init() {
        
        // creates the twitter object used to interact with the Node Twitter package
		client = new twitter({
		  consumer_key: self.consumer_key,
		  consumer_secret: self.consumer_secret,
		  access_token_key: self.access_token_key,
		  access_token_secret: self.access_token_secret
		});

	}

	self = this; // convenience variable
    
    // initialize the instance before returning
	init();

}

// export the constructor
exports.TwitSvc = TwitSvc;