/*
 * Primary file for the API
 *
 */

// Dependencie
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder; // for payloads

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

    // get the headers
    var headers = req.headers;

    // get the payload (if there's any)
    var decoder = new StringDecoder('utf-8');

    // for holding the string from the string decoder
    var buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function() {

        buffer += decoder.end();

        // choose the hanndler this request should go to
        // if none is found, then use the notFound handler
        var chosenHandler = typeof(rounter[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;

        // construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };
        // send the response
        res.end("Hello, World!");

        // log the request path
        //console.log("Request received as path " + trimmedPath + " with method " + method + " with these query string parameter ", queryStringObject);
        console.log("Requests received with this payload: ", buffer);

    })
});
// Start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000 now!");
});

// define the handler
var handlers = {};

// sample handler
handlers.sample = function(data, callback) {

    // callback a http status code, and a payload object
    callback(406,{'name' : 'sample handler'});
};

// handler not found
handlers.notFound = function(data, callback) {
    callback(404);
};
// Define a request router
var router = {
    'sample' : handlers.sample
};