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
    myTweets();
    break;

    case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Mr. Nobody")
    }
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
            
                fs.appendFile("log.txt", songData.artists[0].name);
                fs.appendFile("log.txt", songData.name);
                fs.appendFile("log.txt", songData.album.name);
            }
        } else {
                console.log("ERROR OCCURRED " + err);    
            
              }   
    } 
)}

function myTweets() {
    var twitterUsername = process.argv[3];
    if(!twitterUsername){
        twitterUsername = "DanC_NUBC_Chi";
    }
    params = {screen_name: twitterUsername};
    client.get("statuses/user_timeline/", params, function(error, data, response){
        if (!error) {
            for(var i = 0; i < data.length; i++) {
                //Show the full response in the terminal
                var twitterResults = 
                "@" + data[i].user.screen_name + ": " + 
                data[i].text + "\r\n" + 
                data[i].created_at + "\r\n" + 
                "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                // log(twitterResults); // calling log function
                        
                //adds text to log.txt file
                fs.appendFile("log.txt", "@DanC_NUBC_Chi: " + data[i].text + " Created At: " + data[i].created_at + "\n");
                fs.appendFile("log.txt", "-----------------------" + "\r\n");
            }
        }  else {
            console.log("Error :"+ error);
            return;
            }
    })
};

function omdbData(movie){
    var omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie + '&plot=short&tomatoes=true';
  
    request(omdbURL, function (error, response, body){
      if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);

        //adds text to log.txt
        fs.appendFile('log.txt', "Title: " + body.Title + '\n');
        fs.appendFile('log.txt', "Release Year: " + body.Year + '\n');
        fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating + '\n');
        fs.appendFile('log.txt', "Country: " + body.Country + '\n');
        fs.appendFile('log.txt', "Language: " + body.Language + '\n');
        fs.appendFile('log.txt', "Plot: " + body.Plot + '\n');
        fs.appendFile('log.txt', "Actors: " + body.Actors + '\n');
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating + '\n');
        fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL + '\n');
        
  
      } else{
        console.log("Error occurred: " + error)
      }
      if(movie === "Mr. Nobody"){
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");

      }
    });
  
  }