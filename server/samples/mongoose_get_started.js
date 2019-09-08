/***
 * Get started with mongoose
 * https://mongoosejs.com/docs/index.html
 * 
 * Prerequisites:
 * 1. running mongo db in localhost
 * 2. npm install mongoose
 */
var mongoose = require('mongoose');

// define db schema for kitties
var kittySchema = new mongoose.Schema({
    name: String
})

// methods of the Kitten
kittySchema.methods.speak = function speak() {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};

// create db model class from the defined schema
var Kitten = mongoose.model('Kitten', kittySchema);

function displayKittens() {
    Kitten.find(function onResult(err, kittens) {
        if (err) {
            console.error(err);
        }
        console.log(kittens);
    });
};

function displayKittensByName() {
    var nameFilter = '^fluff/';
    console.log(`display kittens whose name starts with ${nameFilter}`);
    Kitten.find({
        name: nameFilter
    }, function onResult(err, kittens) {
        if (err) {
            console.error(err);
        }
        console.log('found kittens:' + kittens);
    });
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// add callbacks to db connection
var db = mongoose.connection;
db.on('error', function connectionError(err) {
    console.log('connection error:' + err);
});
db.once('open', function connectionDone() {
    console.log('connected to mongo test db');
    onConnectedToDB();
});

console.log('connecting to test db.');
mongoose.connect(
    'mongodb://localhost/test',
    {
        useNewUrlParser: true
    }
);

function onConnectedToDB() {
    // console.log('constructs db documents for the defined model');
    var silence = new Kitten({
        name: 'Silence'
    });

    var fluffy = new Kitten({
        name: 'fluffy'
    });

    console.log('saving kittens to db');
    silence.save(function (error, silence) {
        if (error) {
            console.error(error);
        }
        console.log(`saved kitten ${silence.name} to db`);
        silence.speak();
    });

    fluffy.save(function (error, fluffy) {
        if (error) {
            console.error(error);
        }
        console.log(`saved kitten ${fluffy.name} to db`);
        fluffy.speak();

        console.log('displaying kittens');
        displayKittens();
    });
}
