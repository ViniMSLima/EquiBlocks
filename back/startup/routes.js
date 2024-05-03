const express = require("express");
const player2 = require("../src/routes/player2");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/api", player2)
};
