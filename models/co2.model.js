var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// CO2 Schema from MongoDB
var CO2Schema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    reading: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required:  true
    },
    latitude: {
        type: Number,
        required:  true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    date: {
        type: String,
        required: false
    }
});

// Get CO2 results
CO2Schema.statics.showAll = function (cb) {
    return this.find({}, cb);
};

CO2Schema.statics.getByID = function (id, cb) {
    return this.findById(id, cb);
};

CO2Schema.statics.addNew = function (data, cb) {
    return this.create(data, cb);
}
module.exports = mongoose.model('co2', CO2Schema); // Exporting for outside use