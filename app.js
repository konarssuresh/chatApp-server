let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let mongoose = require("mongoose");
let errorHandler = require("./errorHandler");
let messageController = require("./controller/message.controller");
let port = 9090 || process.env.port;
let url = "mongodb://localhost:27017/chatApp";
let userRouter = require("./router/user.router");
let messageRouter = require("./router/message.router");
let users = {};

let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
  serveClient: false,
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then((result) => console.log("connected"))
  .catch((e) => console.log(error));

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("register", (credentials) => {
    users[credentials.userId] = socket.id;
  });

  socket.on("send-message", (data) => {
    messageController.addMessage(data);
    socket.to(users[data.receiverId]).emit("new-message", data);
  });
});

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);

app.use("/api/users", userRouter);
app.use("/api/chat", messageRouter);

http.listen(port, () => console.log(`app running on port ${port}`));
