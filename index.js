/*
 * Primary file for the API
 *
 */

// Dependencie
var http = require('http');
var url = require('url');

// The server should respond to all requests with a string
var server = http.createServer(function(req, res){

    // get the url and parse it
    var parseUrl = url.parse(req.url, true);

    // get the path
    var path = parseUrl.pathname;
    var trimmedPath = path.replace(/\/+|\/+$/g, '');

    // send the response
    res.end("Hello, World!");

    // log the request path
    console.log("Request received as path " + trimmedPath);

});
// Start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000 now!");
});

