var Co2 = require("./../models/co2.model"),
  express = require("express"),
  nodeGeocoder = require('../config').geocoder,
  router = express.Router();

function numberOfDays() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = new Date(year, month, 0);
    return d.getDate();
}

function data_format (results, date) {

    date_results = []
    n = (results.length)

    for (i = 0; i < n; i++) {
        try {
            temp = results[i].created_at
            temp = JSON.stringify(temp)
            temp = temp.substring(1, 11)
            results[i].date = temp
            console.log("Comparing: " + temp + "//" + date)
            if (temp == date) {
                date_results.push(results[i])
                console.log("Adding temp: " + temp)
            }
        }
        catch (err) {
            throw (err)
        }
    };
    return date_results;
};

function average(results, period_name) {

    var date = new Date();
    var current_day = Number(date.getDate());
    var current_month = date.getMonth() + 1;

    if (period_name == "week") {
        var period = 7;
    } else if (period_name == 'month') {
        period = Number(numberOfDays());
    }
    console.log("Period: " + period);

    sum_readings = 0;
    num_readigns = 0;
    n = (results.length);

    for (i = 0; i < n; i++) {
        try {
            temp = results[i].created_at
            temp = JSON.stringify(temp)
            date_day = Number(temp.substring(9, 11))
            date_month = Number(temp.substring(6, 8))

            if (date_month == current_month && date_day >= (current_day - period)) {
                console.log("OPTION 1")
                sum_readings = Number(results[i].reading) + sum_readings;
                num_readigns = num_readigns + 1;
                console.log("Adding reading form: " + results[i].created_at)
            } else if ((current_month == (date_month - 1) || current_day <= period) && date_day > (period - current_day)) {
                console.log("OPTION 2")
                sum_readings = Number(results[i].reading) + sum_readings;
                num_readigns = num_readigns + 1;
                console.log("Adding reading form: " + results[i].created_at)
            };
            
            
        }
        catch (err) {
            throw (err)
        }
    };
    
    if (sum_readings == 0) {
        return ("No readings for this " + period_name)
    };
    average = sum_readings / num_readigns;
    return average;
};

router.get("/all", function (req, res) {
  // Get readings (CO2)
  Co2.showAll(function (err, results) {
    if (err) {
      res.json(err);
    }
    res.json(results);
  });
});

router.get("/average/week", function (req, res) {
    // Get readings (CO2) weekly average
    Co2.showAll(function (err, results) {
        if (err) {
            res.json(err);
        }

        results = average(results, "week")
        res.json(results);
    });
});

router.get("/average/month", function (req, res) {
    // Get readings (CO2) montly average
    Co2.showAll(function (err, results) {
        if (err) {
            res.json(err);
        }

        results = average(results, "month")
        res.json(results);
    });
});

router.get("/:id", function (req, res) {
  // Get readings by id (CO2)
  Co2.getByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    res.json(result); // The message on the browser
  });
});

router.post("/add", function (req, res) {

  nodeGeocoder.geocode(req.body.location, (err, result) => {

    req.body.latitude = result[0].latitude;
    req.body.longitude = result[0].longitude;

    // Add readings (CO2)
    Co2.addNew(req.body, function (err, result) {
      if (err) {
        res.json(err);
      }
      res.json(result); // The message on the browser
    });

  });
});

router.get("/date/:date2", function (req, res) {
  // Get readings by date (CO2)
  Co2.showAll(function (err, result) {
      if (err) {
          res.json(err);
      }
      date_param = req.params.date2 // The date from input
      date_results = data_format(result,date_param)
     
    
      res.json(date_results); // The message on the browser
  });
});

router.get("/delete/:id", function (req, res) {
  // Delete a reading by id (CO2)
  Co2.remove({_id: req.params.id}, function (err, result) {
    if (err) {
      res.json(err);
    }
    res.json(result); // Message confirming deletion
  });
});



module.exports = {
    date_format: data_format,
    router: router,
    average: average
};
