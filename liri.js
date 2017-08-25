var fs = require('fs');
var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;
var params = { q: 'shar0n0', count: 20 };
var command = process.argv[2];
var userChoice = process.argv[3];
var spotClientID = "c7c4074f27004a139c7103326e7ee520";
var spotClientSecret = '5adc3ec8bd474818aa2fd40c84594f72';
var ombdKey = "40e9cece";

var client = new twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
});

var spotify = new spotify({
    id: spotClientID,
    secret: spotClientSecret
});

// my-tweets: This will show your last 20 tweets and when they were created at in your terminal/bash window.
if (command === "my-tweets") {
    twitterFunc();
}

// spotify-this-song: Shows the first result of info (title,artist,album,link) for the song title the user enters.
if (command === "spotify-this-song") {
    spotifyFunc();
}

// movie-this: Shows 
if (command === "movie-this") {
    imdbFunc();
}

// Twitter Function
function twitterFunc() {
    client.get('search/tweets', params, function (error, tweets) {

        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets.statuses[i].created_at + "  " + tweets.statuses[i].text);
            }
        }
    })

    fs.appendFile("log.txt", "You pulled down 20 tweets!", function (err) {
    });
}

// Spotify Function
function spotifyFunc() {
    if (userChoice === undefined) {
        userChoice = "The-Sign";
    }
    spotify.search({ type: 'track', query: userChoice, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songInfo = (data.tracks.items[0]);
        console.log("----------------------------");
        console.log("Song Name: " + songInfo.name);
        console.log("Artist: " + songInfo.artists[0].name);
        console.log("Song Album: " + songInfo.album.name);
        console.log("Preview Link: " + songInfo.preview_url);
        console.log("----------------------------");
    })

    fs.appendFile("log.txt", "You chose this song: " + userChoice + "   ", function (err) {
    });
}

// Movie Function
function imdbFunc() {
    if (userChoice === undefined) {
        userChoice = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
        // request("'http://www.omdbapi.com/?apikey=' + ombdKey + '&s='" + userChoice, function (error, response, body) {
        if (error) {
            return console.log('error: ' + error);
        }
        var myReturn = JSON.parse(body);
        console.log("============================")
        console.log("Movie Title: " + myReturn.Title);
        console.log("Released in: " + myReturn.Year);
        console.log("IMDB Rating: " + myReturn.imdbRating);
        console.log("Country: " + myReturn.Country);
        console.log("Language: " + myReturn.Language);
        console.log("Actors/Actresses: " + myReturn.Actors);
        console.log("Plot: " + myReturn.Plot);
        console.log("============================")

    });

    fs.appendFile("log.txt", "You chose this movie: " + userChoice + "   ", function (err) {
    });
}

// do-what-it-says
if (command === "do-what-it-says") {
    // We will read the existing bank file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        var doIt = dataArr[0];
        if (doIt === "spotify-this-song") {
            spotifyFunc();
        } else if (doIt === "my-tweets") {
            twitterFunc();
        } else if (doIt === "movie-this") {
            imdbFunc();
        }
    })
};
