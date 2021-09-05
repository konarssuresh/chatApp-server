let mongoose = require("mongoose");

mongoose.pluralize(null);

let messageSchema = mongoose.Schema({
  messageText: String,
  senderId: String,
  receiverId: String,
  messageDateTime: Date,
});

let messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
