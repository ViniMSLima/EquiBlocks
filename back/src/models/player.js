const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 3,
  },
  data: {
    type: String,
    required: true,
    minlength: 3,
  },
  tempo: {
    type: String,
    required: true,
    minlength: 3,
  },
  f1: {
    type: Number,
    required: true,
  },
  f2: {
    type: Number,
    required: true,
  },
  f3: {
    type: Number,
    required: true,
  },
  f4: {
    type: Number,
    required: true,
  },
  f5: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  removedAt: {
    type: Date,
    required: false,
  },
});

const Player = mongoose.model("Player", PlayerSchema);
exports.Player = Player;
exports.PlayerSchema = PlayerSchema;