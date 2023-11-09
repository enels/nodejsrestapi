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
    var parsedUrl = url.parse(req.url, true);

    // get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get query string
    var queryStringObject = parsedUrl.query;

    // get the http method
    var method = req.method.toLowerCase();

    // send the response
    res.end("Hello, World!");

    // log the request path
    console.log("Request received as path " + trimmedPath + " with method " + method + " with these query string parameter ", queryStringObject);

});
// Start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000 now!");
});

