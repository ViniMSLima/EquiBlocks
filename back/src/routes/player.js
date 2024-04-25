const express = require("express");
const PlayerController = require("../controller/playersController");
const router = express.Router();

router
  .post("/postplayer", PlayerController.postPlayer)
  .post("/getplayers", PlayerController.getPlayers)
  
module.exports = router;