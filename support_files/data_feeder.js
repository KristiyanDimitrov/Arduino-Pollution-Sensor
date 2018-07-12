var Co2 = require("./../models/co2.model"),
    express = require("express"),
    router = express.Router(),
    mongoose = require('mongoose'),
    config = require('./../config');

mongoose.connect(
    config.app.db,
    function (err) {
        if (err) {
            console.log("Can't connect to the database - " + err);
        } else {
            console.log("Connected to the database successfully!");
        }
    }
);


template = { "location": "Coventry 1", "reading": "Reading 1" }
locationPool = ['Priory St, Coventry CV1 5FB', '2 Croft Rd, Coventry CV1 3AZ', 'Millennium Place, Hales St, Coventry CV1 1JD', 'City of Coventry Health Centre, 2 4FS, Stoney Stanton Rd, Coventry CV1 4FS', 'Raglan St, Coventry CV1 5QF', '1 Gulson Rd, Coventry CV1 2JH', '3 Warwick Rd, Coventry CV1 3FZ', '121 Upper Spon St, Coventry CV1 3BQ'];
readingPool = ['0', '25', '50', '75', '100', '125', '150', '175', '200', '225', '250', '275', '300'];
device = locationPool.length;

// Sleep function ~~ when used in generate_results() it breaks it
function sleep(time) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
        ;
    }
};

// Generate random readings for co2 for ach of the sensors
function generate_results() {
    i = 0
    while (i < device) {
        template.location = locationPool[i]
        // Look up how to randomly asign readings
        template.reading = readingPool[Math.floor(Math.random() * readingPool.length)];
        console.log(template)

        Co2.create(template, function (err, results) { // VERSION 2
            if (err) {
                console.log(err)
            }
            console.log("Creating :" + results);
        });

        i = i + 1
    };
    
};

generate_results()




