var dotenv =  require('dotenv').config();
var keys = require('./keys.js')
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var twitter = require('twitter');
var client = new twitter(keys.twitter);
var fs = require("fs");

var nodeargv = process.argv;
var command = process.argv[2];

var x = "";




for (var i = 3; i < nodeargv.length; i++) {
    if (i > 3 && i < nodeargv.length){
        x = x + "+" + nodeargv[i];
    } else {
        x = x + nodeargv[i];
    }
}


switch(process.argv[2]){  
    case "spotify-this-song":
      if(x){
        spotifySearch(x);
      } else{
        spotifySearch("Old Man");
      }
    break;
}





function spotifySearch(song) {
    spotify.search({ type: "track", query: song}, function (err, data){
        if(err){
            console.log("ERROR ERROR ERROROOOROROROR");
        
            // for(var i = 0; i < data.tracks.items.length; i++) {
            //     var songData = data.tracks.items[i];
            //     //artist
            //     console.log("Artist: " + songData.artists[0].name);
            //     //song
            //     console.log("Song: " + songData.name);
            //     //album
            //     console.log("Album: " + sonData.album.name);
            
            //     fs.appendFile("log.txt", songData.artists[0].name);
            //     fs.appendFile("log.txt", songData.name);
            //     fs.appendFile("log.txt", songData.album.name);
        } else {
            console.log(JSON.stringify.data)
        }
    } 
            
        
    )
}

