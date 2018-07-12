var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Dht Schema from MongoDB
var DhtSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    reading: {
        type: String,
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

// Get Dht results
DhtSchema.statics.showAll = function(cb) {
    return this.find({}, cb);
};

DhtSchema.statics.getByID = function(id, cb) {
    return this.findById(id, cb);
};

DhtSchema.statics.addNew = function (data, cb) {
    return this.create(data, cb);
}
module.exports = mongoose.model('dhts', DhtSchema); // Exporting for outside use   