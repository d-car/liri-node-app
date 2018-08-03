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

//empty user search item variable
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

    case "my-tweets":
    showTweets();
    break;
}





function spotifySearch(song) {
    spotify.search({ type: "track", query: song}, function(err, data) {
        if(!err){
            for(var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("--------------------------------");
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song
                console.log("Song: " + songData.name);
                //preview link
                console.log("Preview URL: " + songData.preview_url);
                //album
                console.log("Album: " + songData.album.name);
                console.log("--------------------------------");
            
                fs.appendFile("random.txt", songData.artists[0].name);
                fs.appendFile("random.txt", songData.name);
                fs.appendFile("random.txt", songData.album.name);
            }
        } else {
                console.log("ERROR OCCURRED " + err);    
            
              }   
    } 
)}
