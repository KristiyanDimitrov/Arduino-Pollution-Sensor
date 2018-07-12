var nodeGeocoder = require('node-geocoder');

const config = {
	app: {
		port: 3000,
		db: "mongodb://302cem:nE9gX8Vb@ds233238.mlab.com:33238/302cem"
	}
};

// node-geocoder configs
var options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: 'AIzaSyCRIzIyhXXI1JxBGUqmUsX5N4MnxYHHGCo',
	formatter: null
};
var geocoder = nodeGeocoder(options);

module.exports = {
	config: config,
	geocoder: geocoder
}