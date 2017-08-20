// At the top of the liri.js file, write the code you need to grab
//  the data from keys.js. Then store the keys in a variable.
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


// my-tweets: This will show your last 20 tweets and when they were created at in your terminal/bash window.
if (command === "my-tweets") {
    client.get('search/tweets', params, function (error, tweets) {

        if (!error) {
            for (var i = 0; i < 2; i++) {

                console.log(tweets.statuses[i].created_at + "  " + tweets.statuses[i].text);
            }
        }
    });
}

var spotify = new spotify({
    id: spotClientID,
    secret: spotClientSecret
});

// spotify-this-song: Shows the first result of info (title,artist,album,link) for the song title the user enters.
if (command === "spotify-this-song") {
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
}

// movie-this: Shows 
if (command === "movie-this") {
    request('http://www.omdbapi.com/?apikey=' + ombdKey + '&s=' + userChoice, function (error, response, body) {
        if (error) {
            return console.log('error: ' + error);
        }
        // console.log('body: ', body);
        console.log(response.body);
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

        spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function (err, data) {
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
    })
}
