let messageModel = require("../model/message.model");

const addMessage = (data) => {
  console.log("add message");
  messageModel.insertMany(data, (err) => {
    if (!err) {
      console.log("message added");
    } else {
      console.log("error adding messages");
    }
  });
};

let getChatLog = (req, res, next) => {
  const { senderId, receiverId } = req.body;

  messageModel.find(
    {
      senderId: { $in: [senderId, receiverId] },
      receiverId: { $in: [senderId, receiverId] },
    },
    null,
    { sort: { messageDateTime: 1 } },
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
        // next(err);
      }
    }
  );
};

module.exports = { addMessage, getChatLog };
