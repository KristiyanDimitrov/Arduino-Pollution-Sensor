var express = require("express"),
	router = express.Router(),
	Co2 = require('../models/co2.model');

router.get('/', (req, res, next) => {
	Co2.find((err, docs) => {

		var uniqueLocations = [];
		var uniqueCoords = {};
		var locationOccurences = {};
		var latestReadings = {};

		// Gathering unique locations + their coords
		for (var i = 0; i < docs.length; i++) {
			if(!uniqueLocations.includes(docs[i].location)) {
				uniqueLocations.push(docs[i].location);
				var location = docs[i].location;
				uniqueCoords[location] = [docs[i].latitude, docs[i].longitude]
			}
		}

		// Get reading occurances of each location
		for (var i = 0; i < uniqueLocations.length; i++) {
			for (var j = 0; j < docs.length; j++) {
				if(uniqueLocations[i] === docs[j].location) {
					var key = uniqueLocations[i];
					if(locationOccurences[key] === undefined) {
						locationOccurences[key] = []
					}
					locationOccurences[key].push(docs[j].reading)
				}
			}
		}

		// Get latest reading of each location
		for (var i = 0; i < uniqueLocations.length; i++) {
			var key = uniqueLocations[i];
			var length = locationOccurences[key].length;
			latestReadings[key] = locationOccurences[key][length-1]
		}

		// Accumulating total readings of each location
		var locationTotalReadings = {};
		var sum = 0;

		for (var i = 0; i < uniqueLocations.length; i++) {
			for (var j = 0; j < docs.length; j++) {
				if(uniqueLocations[i] === docs[j].location) {
					sum += docs[j].reading;
				}
			}
			var key = uniqueLocations[i];
			locationTotalReadings[key] = sum
			sum = 0;
		}

		console.log('\nUnique Locations\n', uniqueLocations);
		console.log('\nUnique Coordinates\n', uniqueCoords);
		console.log('\nLocation Total Readings\n', locationTotalReadings);
		console.log('\nReading occurences by each location\n', locationOccurences);
		console.log('\nLatest Reading of each location\n', latestReadings, '\n');

		res.render('index', {
			docs: docs,
			uniqueLocations: uniqueLocations,
			uniqueCoords: uniqueCoords,
			coordsArrStringified: () => {
				var arr = [];
				for (var i = 0; i < uniqueLocations.length; i++) {
					let key = uniqueLocations[i];
					arr.push(uniqueCoords[key])
				}
				return JSON.stringify(arr)
			},
			// locationTotalReadings: locationTotalReadings,
			latestReadings: latestReadings,
			locationOccurences: locationOccurences,
			randomRGB: () => {
				var arr = [];

				for (var i = 0; i < 3; i++) {
					arr.push(Math.ceil(Math.random() * 255));
				}

				arr = arr.join(",");
				return arr;
			}
		});
	});
});

module.exports = router;
