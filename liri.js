// At the top of the liri.js file, write the code you need to grab
//  the data from keys.js. Then store the keys in a variable.
var fs = require('fs');
var keys = require('./keys.js');
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;


// Make it so liri.js can take in one of the following commands:

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says