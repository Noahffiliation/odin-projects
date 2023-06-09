const express = require('express');
const router = express.Router();

const game_controller = require("../controllers/gameController");
const genre_controller = require("../controllers/genreController");

// Game routes

router.get("/", game_controller.index);

router.get("/game/create", game_controller.game_create_get);

router.post("/game/create", game_controller.game_create_post);

router.get("/games", game_controller.game_list);

router.get("/game/:id", game_controller.game_detail);

router.get("/game/:id/update", game_controller.game_update_get);

router.post("/game/:id/update", game_controller.game_update_post);

router.get("/game/:id/delete", game_controller.game_delete_get);

router.post("/game/:id/delete", game_controller.game_delete_post);

// Genre routes

router.get("/genre/create", genre_controller.genre_create_get);

router.post("/genre/create", genre_controller.genre_create_post);

router.get("/genres", genre_controller.genre_list);

router.get("/genre/:id", genre_controller.genre_detail);

router.get("/genre/:id/update", genre_controller.genre_update_get);

router.post("/genre/:id/update", genre_controller.genre_update_post);

router.get("/genre/:id/delete", genre_controller.genre_delete_get);

router.post("/genre/:id/delete", genre_controller.genre_delete_post);

module.exports = router;