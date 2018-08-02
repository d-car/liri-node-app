var keys = require('./keys.js');
var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');
var client = new twitter(keys.twitterKeys);
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
        spotifySearch("Fluorescent Adolescent");
      }
    break;
}





function spotifySearch(song) {
    spotify.search({ type: "track", query: song}, function (error, data){
        if(!error){
            for(var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song
                console.log("Song: " + songData.name);
                //album
                console.log("Album: " + sonData.album.name);
            
                fs.appendFile("log.txt", songData.artists[0].name);
                fs.appendFile("log.txt", songData.name);
                fs.appendFile("log.txt", songData.album.name);
            }
        } else {
            console.log("ERROR ERROR ERROROOOROROROR");
        }
    })
}



function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotifySong(txt[1]);
    });
  }