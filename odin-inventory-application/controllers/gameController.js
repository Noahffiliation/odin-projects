const Game = require('../models/game');
const Genre = require('../models/genre');
const { body, validationResult } = require('express-validator');
const async = require('async');

exports.index = (req, res) => {
    async.parallel({
        game_count(callback) {
            Game.countDocuments({}, callback);
        },
        genre_count(callback) {
            Genre.countDocuments({}, callback);
        },
    },
    (err, results) => {
        res.render("index", {
            title: "Inventory Home",
            error: err,
            data: results,
        });
    });
};

exports.game_list = (req, res, next) => {
    Game.find({}, "name")
        .sort({ name: 1})
        .exec(function(err, list_games) {
            if (err) {
                return next(err);
            }
            res.render("game_list", { title: "Game List", game_list: list_games });
        });
};

exports.game_detail = (req, res, next) => {
    async.parallel({
        game(callback) {
            Game.findById(req.params.id)
                .populate("genre")
                .exec(callback)
        },
    },
    (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.game == null) {
            const err = new Error("Game not found");
            err.status = 404;
            return next(err);
        }
        res.render("game_detail", {
            title: results.game.name,
            game: results.game,
        });
    });
};

exports.game_create_get = (req, res, next) => {
    async.parallel({
        genres(callback) {
            Genre.find(callback);
        },
    },
    (err, results) => {
        if (err) {
            return next(err);
        }
        res.render("game_form", {
            title: "Create Game",
            genres: results.genres,
        });
    });
};

exports.game_create_post = [
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Price must not be empty.")
        .trim()
        .escape(),
    body("stock", "Stock must not be empty.")
        .trim()
        .escape(),
    body("genre.*").escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const game = new Game({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            genre: req.body.genre.name,
        });

        if (!errors.isEmpty()) {
            async.parallel({
                genres(callback) {
                    Genre.find(callback);
                },
            },
            (err, results) => {
                if (err) {
                    return next(err);
                }
                res.render("game_form", {
                    title: "Create Game",
                    game,
                    errors: errors.array(),
                });
            });
            return;
        }

        game.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(game.url);
        });
    },
];

exports.game_delete_get = (req, res, next) => {
    async.parallel({
        game(callback) {
            Game.findById(req.params.id).exec(callback);
        },
    },
    (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.game == null) {
            const err = new Error("Game not found");
            err.status = 404;
            return next(err);
        }
        Game.findByIdAndDelete(results.game.id, {}, (err, result) => {
            if (err) {
                return next(err);
            }
            Game.find({}, "name")
                .sort({ name: 1})
                .exec(function(err, list_games) {
                    if (err) {
                        return next(err);
                    }
                    res.render("game_list", { title: "Game List", game_list: list_games });
                });
        });
    });
};

exports.game_delete_post = (req, res, next) => {
    res.send("NOT IMPLEMENTED: Game delete POST");
};

exports.game_update_get = (req, res, next) => {
    async.parallel({
        game(callback) {
            Game.findById(req.params.id)
                .populate("genre")
                .exec(callback);
        },
        genres(callback) {
            Genre.find(callback);
        },
    },
    (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.game == null) {
            const err = new Error("Game not found");
            err.status = 404;
            return next(err);
        }
        res.render("game_form", {
            title: "Update Game",
            game: results.game,
        });
    });
};

exports.game_update_post = [
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Price must not be empty.")
        .trim()
        .escape(),
    body("stock", "Stock must not be empty.")
        .trim()
        .escape(),
    body("genre.*").escape(),
  
    (req, res, next) => {
        const errors = validationResult(req);
  
        const game = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            genre: req.body.genre.name,
        };
  
        if (!errors.isEmpty()) {
            async.parallel({
                genres(callback) {
                    Genre.find(callback);
                },
            },
            (err, results) => {
                if (err) {
                    return next(err);
                }
                res.render("game_form", {
                    title: "Update Game",
                    game,
                    errors: errors.array(),
                });
            });
            return;
        }
  
        Game.findByIdAndUpdate(req.params.id, game, {}, (err, thegame) => {
            if (err) {
                return next(err);
            }
            res.redirect(thegame.url);
        });
    },
];