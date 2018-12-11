
require("dotenv").config();
//this is the code to use key.js file in this file
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require("axios");
//userInput variable is what I use for my searches
var userInput = process.argv.slice(3).join("+");
//command allows me to record what command the user inputs to Liri. the slice(2, 3) isolates the infomation I need
var command = process.argv.slice(2, 3);
//the next 2 lines are code to pull a usable search term from what the user inputs specifically for the Spotify NPM
var x = process.argv.slice(3).join(" ");
var songInput = "'" + x + "'";
var fs = require("fs");


var spotify = new Spotify(keys.spotify);

//This is to update the log.txt file showing every command entered
function appendCommand() {
    fs.appendFile("log.txt", " " + command + ",", function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

//concertThis function gets concert information from userInput
function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(function (response) {
        console.log("***********************************");
        console.log("Welcome to Liri Bot v 1.0")
        console.log("Concert Finder")
        console.log("***********************************");
        //showing the first 5 results to keep the page managable
        for (let i = 0; i < 5; i++) {
            console.log("----------------------------------");
            console.log(`Artist: ${response.data[i].lineup}\nVenue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}\nDate/Time: ${response.data[i].datetime}`);
        }
    });
    appendCommand();

}

function spotifyThisSong() {
    //this is for when there is no userInput/songInput
    if (userInput == '') {
        spotify.search({ type: 'track', query: 'The Sign' })
            .then(function (results) {
                console.log("***********************************");
                console.log("Welcome to Liri Bot v 1.0")
                console.log("Song Finder")
                console.log("***********************************");
                //showing the first 5 results to keep the page managable
                for (let i = 0; i < 5; i++) {
                    console.log("----------------------------------");
                    console.log(`Band: ${results.tracks.items[i].artists[0].name}\nSong: ${results.tracks.items[i].name}\nPreview URL: ${results.tracks.items[i].preview_url}\nAlbum: ${results.tracks.items[0].album.name}`)
                    console.log("----------------------------------");
                }
            });
    //this is a search based on user input
    } else {

        spotify.search({ type: 'track', query: songInput })
            .then(function (results) {
                console.log("***********************************");
                console.log("Welcome to Liri Bot v 1.0")
                console.log("Song Finder")
                console.log("***********************************");
                //showing the first 5 results to keep the page managable
                for (let i = 0; i < 5; i++) {
                    console.log("----------------------------------");
                    console.log(`Band: ${results.tracks.items[i].artists[0].name}\nSong: ${results.tracks.items[i].name}\nPreview URL: ${results.tracks.items[i].preview_url}\nAlbum: ${results.tracks.items[0].album.name}`)
                    console.log("----------------------------------");
                }
            });
    }
    appendCommand();
}

//get movie information for userInput
function movieThis() {
    var queryUrl = "";
    if (userInput == "") {
        //this is for when no 'userInput' is entered
        queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
        //this is a search based on userInput
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
                //showing 5 results to keep screen managable
                for (let i = 0; i < 5; i++) {
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
    //this is if the command is invalid
    console.log("----------------------------------");
    console.log("Command Not Recognized");
    console.log("----------------------------------");
}


