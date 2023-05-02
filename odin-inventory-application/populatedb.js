#! /usr/bin/env node

var async = require('async');
require("dotenv").config();

var Game = require('./models/game');
var Genre = require('./models/genre');

var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var games = [];
var genres = [];

function gameCreate(name, price, stock, description, genre, callback) {
    gamedetail = { name: name, price: price, stock: stock };
    if (description != false) gamedetail.description = description;
    if (genre != false) gamedetail.genre = genre;

    var game = new Game(gamedetail);
    game.save(function(err) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        console.log("New Game: " + game);
        games.push(game);
        callback(null, game)
    });
}

function genreCreate(name, description, callback) {
    genredetail = { name:name };
    // file deepcode ignore IncompatibleTypesInComparison: <please specify a reason of ignoring this>
    if (description != false) genredetail.description = description;

    var genre = new Genre(genredetail);
    genre.save(function(err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("new Genre: " + genre);
        genres.push(genre);
        callback(null, genre);
    });
}

function createGenres(callback) {
    async.parallel([
        function(callback) {
            genreCreate("Sci-fi", "Contains anything science-fiction", callback);
        },
        function(callback) {
            genreCreate("Shooter", "Contains anything with guns", callback);
        },
        function(callback) {
            genreCreate("Adventure", "Contains anything about exploring the world", callback);
        },
    ]);
}

function createGames(callback) {
    async.parallel([
        function(callback) {
            gameCreate("Destiny 2", 60, 2, false, genres[0], callback);
        },
        function(callback) {
            gameCreate("Apex Legends", 20, 5, false, genres[1], callback);
        },
        function(callback) {
            gameCreate("God of War", 50, 5, false, genres[2], callback);
        },
    ]);
}

async.series([
    createGenres,
    createGames,
],
function(err, results) {
    if (err) {
        console.log("FINAL ERR: " + err);
    }
    mongoose.connection.close();
});
