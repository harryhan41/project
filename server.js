// Get the dependencies
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();

var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use(cookieParser());

app.use(session({secret: 'topsecret'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, "dist/webdev-jianqiao-han")));

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || "3100";
app.set("port", port);

// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log("Running on port 3100"));


var connectionString = "mongodb://webdevjq1:webdevjq1@ds145456.mlab.com:45456/heroku_z8c5n66p";

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect(connectionString, {useNewUrlParser: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

require("./assignment/app")(app);
