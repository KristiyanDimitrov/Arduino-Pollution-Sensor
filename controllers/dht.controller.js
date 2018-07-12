var Dht = require("./../models/dht.model"),
  express = require("express"),
  nodeGeocoder = require('../config').geocoder,
  router = express.Router();

router.get("/all", function(req, res) {
  // Get readings (Dht)
  Dht.showAll(function(err, results) {
    if (err) {
      res.json(err);
    }
    res.json(results);
  });
});

router.get("/:id", function(req, res) {
  // Get readings by id (Dht)
  Dht.getByID(req.params.id, function(err, result) {
    if (err) {
      res.json(err);
    }
    res.json(result); // The message on the browser
  });
});

router.get("/delete/:id", function (req, res) {
  // Delete a reading by id (Dht)
  Dht.remove({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    res.json(result); // Message confirming deletion
  });
});

router.post("/add", function(req, res) {

  nodeGeocoder.geocode(req.body.location, (err, result) => {

    req.body.latitude = result[0].latitude;
    req.body.longitude = result[0].longitude;

    // Add readings (Dht)
    Dht.addNew(req.body, function(err, result) {
      if (err) {
        res.json(err);
      }
      res.json(result); // The message on the browser
    });
  });
});

module.exports = router;
