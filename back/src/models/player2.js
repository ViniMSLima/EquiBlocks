const mongoose = require("mongoose");

const Player2Schema = new mongoose.Schema({
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
  tentativas: {
    type: Number,
    required: true,
  },
  qtd_formas: {
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

const Player2 = mongoose.model("Player2", Player2Schema);
exports.Player2 = Player2;
exports.Player2Schema = Player2Schema;