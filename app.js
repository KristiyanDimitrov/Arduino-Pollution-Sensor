var express = require("express"),
  app = express(),
  http = require("http"),
  path = require("path"),
  fs = require('fs'),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  mqtt = require("mqtt"),
  co2Routes = require('./controllers/co2.controller'),
  dhtRoutes = require('./controllers/dht.controller'),
  excelRoutes = require('./controllers/excel.controller'),
  config = require('./config').config,
  port = process.env.PORT || config.app.port;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use('/api/sensor/co2', co2Routes.router);
app.use('/api/sensor/dht', dhtRoutes);
app.use('/api/excel/', excelRoutes);
app.use('/map', require('./controllers/view.controller'));

// Connect to mLab through Mongoose
mongoose.connect(
  config.app.db,
  function(err) {
    if (err) {
      console.log("Can't connect to the database - " + err);
    } else {
      console.log("Connected to the database successfully!");
    }
  }
);

var client = mqtt.connect("mqtts://gniteckm:d524d9bde1e74f289abb49cbaa5d8b72@io.adafruit.com");

client.on('connect', function() {
  console.log("Client connected");
  client.subscribe("gniteckm/feeds/sensor.co2")
})

client.on('message', function(topic, message) {
  messsage = JSON.parse(message.toString());
  console.log(message);
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  res.send("Plese use /api/...");
});

app.listen(port, function() {
  console.log("Server is running on " + port);
});
