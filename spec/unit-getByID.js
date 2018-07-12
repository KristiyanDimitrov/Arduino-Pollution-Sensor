var request = require("request"),
    co2_date = require("./../controllers/co2.controller");

var base_url_id = "http://localhost:3000/api/sensor/co2/5aa6df16db61702304457d7f"
var base_url_all = "http://localhost:3000/api/sensor/co2/all"
var base_url_del = "http://localhost:3000/api/sensor/co2/delete/5aa6e0854486f53128b10dd7"


var mode = process.env

if (typeof (mode.CL) != 'undefined') {

    describe("Test API modules", function () {



        // Test for getting a reading by id
        it("Returns reading with the ID", function (done) {
            request.get(base_url_id, function (error, response, body) {
                body = JSON.parse(body)
                expect(body.location).toBe("CO2");
                expect(body.reading).toBe("reading ");
                done();
            });
        });

        // Test for getting all present readings in DB (NEED TO EDDIT)
        // ~~~ ADD MORE READINGS AND MORE EXPECTATIONS WHEN THE POST IS FIGURED OUT// traverse all of the added readings and check for the content ~~~~
        it("Returns all readings", function (done) {
            request.get(base_url_all, function (error, response, body) {
                const reading = { "_id": "5aa6df16db61702304457d7f", "location": "CO2", "reading": "reading ", "created_at": "2018-03-12T20:12:06.216Z", "updated_at": "2018-03-12T20:12:06.216Z", "__v": 0 }
                expect(body).toContain(JSON.stringify(reading));
                done();
            });
        });

        // Test for deleting a reading
        it("Deletes a reading", function (done) {
            request.get(base_url_del, function (error, response, body) {
                expect(true).toBe(true) // ~~~~~ Change to test if it was called
                done();
            });
        });

        it("Gets reading by ID to test if it is still present after delete", function (done) {
            request.get(base_url_id, function (error, response, body) {
                expect(body).toBe("null")
                done();
            });
        });

    });

} else {

    readings = [{ "_id": "5aa6df16db61702304457d7z", "location": "CO2", "reading": 200, "created_at": "2018-02-29T20:12:06.216Z", "updated_at": "2018-02-29T20:12:06.216Z", "__v": 0 }, { "_id": "5aa6df16db61702304457d7f", "location": "CO2", "reading": 200, "created_at": "2018-03-10T20:12:06.216Z", "updated_at": "2018-03-10T20:12:06.216Z", "__v": 0 }, { "_id": "5aa6e0854486f53128b10dd7", "location": "CO2", "reading": 200, "created_at": "2018-03-12T20:18:13.445Z", "updated_at": "2018-03-12T20:18:13.445Z", "__v": 0 }, { "_id": "5aa7bb677ec28428e03bf2c4", "location": "Priory St, Coventry CV1 5FB", "reading": 250, "created_at": "2018-03-13T11:52:07.883Z", "updated_at": "2018-03-13T11:52:07.883Z", "__v": 0 }, { "_id": "5aa7bb861c34a10f10bdb0da", "location": "Priory St, Coventry CV1 5FB", "reading": 200, "created_at": "2018-03-13T11:52:38.647Z", "updated_at": "2018-03-13T11:52:38.647Z", "__v": 0 }, { "_id": "5aa7bb861c34a10f10bdb0dc", "location": "2 Croft Rd, Coventry CV1 3AZ", "reading": 225, "created_at": "2018-03-13T11:52:38.648Z", "updated_at": "2018-03-13T11:52:38.648Z", "__v": 0 }, { "_id": "5aa7bb861c34a10f10bdb0db", "location": "Priory St, Coventry CV1 5FB", "reading": 225, "created_at": "2018-03-13T11:52:38.648Z", "updated_at": "2018-03-13T11:52:38.648Z", "__v": 0 }, { "_id": "5aa7bb861c34a10f10bdb0dd", "location": "2 Croft Rd, Coventry CV1 3AZ", "reading": 225, "created_at": "2018-03-13T11:52:38.648Z", "updated_at": "2018-03-13T11:52:38.648Z", "__v": 0 }]

    describe("Date format function", function () {
        it('Formats the date', function () {
            expect(co2_date.date_format(readings, '2018-03-10')).toEqual([{ _id: '5aa6df16db61702304457d7f', location: 'CO2', reading: 200, created_at: '2018-03-10T20:12:06.216Z', updated_at: '2018-03-10T20:12:06.216Z', __v: 0, date: '2018-03-10' }]);
        });
    });

    describe("Average readigs for a period of time", function () {
        it("Weekly average", function () {
            expect(co2_date.average(readings, "week")).toEqual(217.85714285714286);
        });
        it("Monthly average", function () {
            expect(co2_date.average(readings, "month")).toEqual(215.625);
        });

    });
};
