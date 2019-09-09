/***
 * Reference:
 * https://github.com/substack/stream-handbook#introduction
 * 
 * Run server:
 *   cd path/to/stream.js
 *   node stream.js
 * 
 * Connect to server:
 *   curl -X GET  http://127.0.0.1:8000
 */
////////////////////////////////////////////////////////////////////////////////////////////////
const http = require('http');
const fs = require('fs');
const through = require('through2');
const Stream = require('stream');
const Readable = Stream.Readable;
const Writable = Stream.Writable;

////////////////////////////////////////////////////////////////////////////////////////////////

// 1. node stream.js
// 2. curl -X GET  http://127.0.0.1:8000
// createHttpSever();

// generateCharSequenceWithDelay

// (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node stream.js
// consumeReadableStream();

// (echo beep; sleep 1; echo boop) | node stream.js
// writeToStream();

// writeToFile();

// produceCharsSequence();

// > (echo beep; sleep 1; echo boop) | node stream
// > node stream
// printCharsWithTraditionalStream();
// printCharsWithThrough();

// (echo '{"beep": "boop"}') | node stream.js
bufferCharsWithConcatStream();

////////////////////////////////////////////////////////////////////////////////////////////////
function createHttpSever() {
    var port = 8000;
    var server = http.createServer(function (req, res) {
        // respondByReadingFileContents(req, res);
        // respondByPipingFileContentsStream(req, res).on('finish', onFinishedReadingContents);
        respondByGeneratingCharSequenceStream().pipe(res).on('finish', onFinishedReadingContents);

        function onFinishedReadingContents() {
            console.log('finished reading contents');
            res.end();
        }
    });

    server.on('close', function () {
        console.log('server closed');
    });

    server.on('connection', function (sock) {
        console.log(`new connection from ${sock.localAddress}:${sock.localPort}`);
    });

    server.on('error', function (err) {
        console.log('server error: ' + err);
    });

    server.on('listening', function () {
        console.log(`listening on port: ${port}`);
    })
    server.listen(port);
}

function respondByReadingFileContents(req, res) {
    fs.readFile(__dirname + "/data.txt", function (err, data) {
        if (err) console.error(err);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(data.toString());
        res.end();
    });
}

function respondByPipingFileContentsStream(req, res) {
    var stream = fs.createReadStream(__dirname + "/data.txt");
    return stream.pipe(res);
}

function respondByGeneratingCharSequenceStream() {
    var rs = new Readable;
    var c = 97;

    rs._read = function read() {
        rs.push(String.fromCharCode(c++));
        if (c > 'z'.charCodeAt(0)) {
            rs.push(null);
        }
    }

    return rs;
}

function generateCharSequenceWithDelay() {
    var rs = Readable({
        objectMode: true
    });

    var c = 97 - 1;

    rs._read = function () {
        if (c >= 'z'.charCodeAt(0)) return rs.push(null);

        setTimeout(function () {
            rs.push(String.fromCharCode(++c));
        }, 100);
    };

    rs.pipe(process.stdout);

    process.on('exit', function () {
        console.error('\n_read() called ' + (c - 97) + ' times');
    });
    process.stdout.on('error', process.exit);
}

function consumeReadableStream() {
    process.stdin.on('readable', function () {
        var buf = process.stdin.read();
        console.dir(buf);
    });
}

function writeToStream() {
    var ws = Writable();
    ws._write = function (chunk, enc, next) {
        console.dir(chunk);
        next();
    };
    process.stdin.pipe(ws);
}

function writeToFile() {
    var ws = fs.createWriteStream('data.txt');
    ws.write('beep ');

    setTimeout(function () {
        ws.end('boop\n');
    }, 1000);
}

function produceCharsSequence() {
    var stream = new Stream();
    var c = 64;
    var iv = setInterval(function name() {
        if (++c >= 75) {
            clearInterval(iv);
            stream.emit('end');
        } else {
            stream.emit('data', String.fromCharCode(c));
        }
    }, 100);

    stream.pipe(process.stdout);
}

function printCharsWithTraditionalStream() {
    process.stdin.on('data', function (buf) {
        console.log(buf);
    });
    process.stdin.on('end', function () {
        console.log('__END__');
    });
}

function printCharsWithThrough() {
    process.stdin.pipe(through(write, end));

    function write(buf) {
        console.log(buf);
    }

    function end() {
        console.log('___END__');
    }
}

function bufferCharsWithConcatStream() {
    var concat = require('concat-stream');
    process.stdin.pipe(concat(function (body) {
        console.log(JSON.parse(body));
    }))
}