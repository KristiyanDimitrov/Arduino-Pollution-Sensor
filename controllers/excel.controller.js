var Co2 = require("./../models/co2.model"),
  Dht = require("./../models/dht.model"),
  express = require("express"),
  q = require("q"),
  router = express.Router();

router.get("/all", function (req, res, next) {

  const co2Collector = function () {
    return Co2.showAll(function (err, results) {
      if (err) {
        res.json(err);
      }
      co2Data = results;
      return co2Data;
    });
  };

  const dhtCollector = function () {
    return Dht.showAll(function (err, results) {
      if (err) {
        res.json(err);
      }
      dhtData = results;
      return dhtData;
    });
  };

  const dataMerge = function (toMerge) {
    mergedData = [];
    mergedData = mergedData.concat(toMerge[0], toMerge[1])
    res.json({
      message: "Done!",
      result: mergedData
    });
    return mergedData;
  };

  q
    .all([q.fcall(co2Collector), q.fcall(dhtCollector)])
    .then(dataMerge)
    .done();
});
module.exports = router;