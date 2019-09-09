var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/data.txt", function (err, data) {
        if (err) console.error(err);
        
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data.toString());
        res.end();
    });
});

server.listen(8000);