var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Dht Schema from MongoDB
var ExcelSchema = mongoose.Schema({
    merged: {
        co2: [{
            type: Schema.Types.ObjectId,
            ref: 'co2'
        }],
        dht: {
            type: Schema.Types.ObjectId,
            ref: 'dhts'
        }

    }
});

// ExcelSchema.statics.showAll = function (cb) {
//     return this.find({}, cb);
// };

ExcelSchema.statics.showAll = function (cb) {
    return this.find().populate('co2 dht').exec(cb);
};

module.exports = mongoose.model('merged_sensors', ExcelSchema); // Exporting for outside use