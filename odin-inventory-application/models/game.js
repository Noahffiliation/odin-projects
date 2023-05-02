const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, get: getPrice, set: setPrice, required: true },
    stock: { type: Number, required: true },
    description: { type: String },
    genre: { type: Schema.Types.ObjectId, ref: "Genre" },
});

GameSchema.virtual("url").get(function() {
    return `/inventory/game/${this._id}`;
});

function getPrice(num) {
    return (num/100).toFixed(2);
}

function setPrice(num) {
    return num*100;
}

module.exports = mongoose.model("Game", GameSchema);