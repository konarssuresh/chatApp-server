let messageController = require("../controller/message.controller");

let express = require("express");

let router = express.Router();

router.post("/chatlogs", messageController.getChatLog);

module.exports = router;
