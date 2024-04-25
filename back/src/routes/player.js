const express = require("express");
const PlayerController = require("../controller/playersController");
const router = express.Router();

router
  .post("/postplayer", PlayerController.postPlayer)
  .get("/getplayers", PlayerController.getPlayers)
  
module.exports = router;
