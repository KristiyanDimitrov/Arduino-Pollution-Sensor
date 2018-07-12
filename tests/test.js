// MAIN TEST
var assert = require('chai').assert,
	mongoose = require('mongoose'),
	Co2 = require('../models/co2.model');

describe('Models', function() {

		it('showAll()', function() {
			var docs = Co2.showAll(function (err, results) {
				if (err) {
					throw err;
				}
				return results;
			});
			console.log(docs.reading);
			assert.notEqual(docs.reading, undefined)
		});

});