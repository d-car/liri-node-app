# liri-node-app
Week 10 assignment

This app was designed for the Week 10 of NUBC Chicago TR Cohort homework.  LIRI is a bot that will pull data from Twitter, Spotify, and OMDB to provide info on user searches.  The 4 primary commands for LIRI are:

  * `my-tweets`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`

## Start

- Clone repo.
- Run command 'npm i' in your terminal.
- Run command 'node liri.js' or run one of the programmed commands.

## Commands

1. `node liri.js my-tweets`

  * Displays the last 20 tweets of a user searched in the terminal window:

2. `node liri.js spotify-this-song <song name>`

  * Displays the following stats about the song in terminal window:
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    *"Old Man" by Neil Young.

3. `node liri.js movie-this <movie name>`

  * Displays the following information in the terminal window:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `node liri.js do-what-it-says`

  * Takes the text from random.txt and runs the song through spotify-this-song command


## Requirements
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```


