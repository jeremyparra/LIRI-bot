
require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require("axios");
var userInput = process.argv.slice(3).join("+");
var command = process.argv.slice(2, 3);
var x = process.argv.slice(3).join(" ");
var songInput = "'" + x + "'";
var fs = require("fs");


var spotify = new Spotify(keys.spotify);

// console.log(songInput);
function appendCommand() {
    fs.appendFile("log.txt", command, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function (response) {
        console.log("***********************************");
        console.log("Welcome to Liri Bot v 1.0")
        console.log("Concert Finder")
        console.log("***********************************");

        for (let i = 0; i < 5; i++) {
            console.log("----------------------------------");
            console.log(`Artist: ${response.data[i].lineup}\nVenue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}\nDate/Time: ${response.data[i].datetime}`);
        }
    });
    appendCommand();

}

function spotifyThisSong() {
    if (userInput == '') {
        spotify.search({ type: 'track', query: 'The Sign' })
            .then(function (results) {
                console.log("***********************************");
                console.log("Welcome to Liri Bot v 1.0")
                console.log("Song Finder")
                console.log("***********************************");
                for (let i = 0; i < 5; i++) {
                    console.log("----------------------------------");
                    console.log(`Band: ${results.tracks.items[i].artists[0].name}\nSong: ${results.tracks.items[i].name}\nPreview URL: ${results.tracks.items[i].preview_url}\nAlbum: ${results.tracks.items[0].album.name}`)
                    console.log("----------------------------------");
                }
            });

    } else {

        spotify.search({ type: 'track', query: songInput })
            .then(function (results) {
                console.log("***********************************");
                console.log("Welcome to Liri Bot v 1.0")
                console.log("Song Finder")
                console.log("***********************************");
                for (let i = 0; i < 5; i++) {
                    console.log("----------------------------------");
                    console.log(`Band: ${results.tracks.items[i].artists[0].name}\nSong: ${results.tracks.items[i].name}\nPreview URL: ${results.tracks.items[i].preview_url}\nAlbum: ${results.tracks.items[0].album.name}`)
                    console.log("----------------------------------");
                }
            });
    }
    appendCommand();
}

function movieThis() {
    var queryUrl = "";
    if (userInput == "") {
        queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
    } else {
        queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    }
    axios.get(queryUrl).then(
        function (response) {
            console.log("***********************************");
            console.log("Welcome to Liri Bot v 1.0")
            console.log("Movie Finder")
            console.log("***********************************");
            console.log("------------------------------------------------------------");
            console.log(`Title: ${response.data.Title}\nRelease: ${response.data.Year}\n\nIMDB Rating: ${response.data.Ratings[0].Value}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\n\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\n\nPlot: ${response.data.Plot}\n\nActors: ${response.data.Actors}`);
            console.log("------------------------------------------------------------");

        }
    );
    appendCommand();
}

function doIt() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        spotify.search({ type: 'track', query: data[1] })
            .then(function (results) {
                console.log("***********************************");
                console.log("Welcome to Liri Bot v 1.0")
                console.log("Do What It Says")
                console.log("***********************************");
                for (let i = 0; i < 1; i++) {
                    console.log("----------------------------------");
                    console.log(`Band: ${results.tracks.items[i].artists[0].name}\nSong: ${results.tracks.items[i].name}\nPreview URL: ${results.tracks.items[i].preview_url}\nAlbum: ${results.tracks.items[0].album.name}`)
                    console.log("----------------------------------");
                }
            });


    });
    appendCommand();
}


if (command == "concert-this") {
    concertThis();
} else if (command == 'spotify-this-song') {
    spotifyThisSong();
} else if (command == 'movie-this') {
    movieThis();
} else if (command == 'do-what-it-says') {
    doIt();
} else {
    console.log("input not recognized")
}


