//Install express server
const express = require("express");
const path = require("path");
require('dotenv').config({path: path.join(__dirname, "../.env")});
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoManager } = require("./db");
const app = express();
const http = require("http");
const indexRouter = require("./routes/index");

const debug = require("debug")("backendcode:server");
require("./globalFunction");

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/../dist/MEAN-chat-app"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/../dist/MEAN-chat-app/index.html"));
});


const server = http.createServer(app);


const port = normalizePort(process.env.PORT || "3004");


app.set("port",port);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);


const mongoManager = new MongoManager({
  useNewUrlParser: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoManager.connect();
// Start the app by listening on the default Heroku port
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/")));


app.get("/health-check", (req, res) => {
  res.send("all good ✅");
});
app.use("/api", indexRouter);


function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

