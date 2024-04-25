const express = require("express");
const player = require("../src/routes/player");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/api", player)
};
