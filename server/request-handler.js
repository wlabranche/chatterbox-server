/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var url = require('url');
  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

module.exports.handler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var parsedUrl = url.parse(request.url);
  console.log(parsedUrl.pathname)
  var statusCodes = {
    GET: 200,
    POST: 201,
    OPTIONS: 200
  };

  var statusCode = statusCodes[request.method];

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  console.log(!!routes[parsedUrl.pathname]);
  if (routes[parsedUrl.pathname]) {
    response.writeHead(statusCode, headers);

    if (request.method === 'OPTIONS') {
      response.end();
    }

    if (request.method === 'POST') {
      request.on('data', function(data){
        data = JSON.parse(data);
        data['objectId'] = count++;
        recieved.results.push(data);
        response.end(JSON.stringify({objectId: data['objectId'], createdAt: new Date()}));
      });
    }

  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
    console.log(recieved);
    if (request.method === 'GET') {
      response.end(JSON.stringify(recieved));
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var classes = [];

var routes = {
  "/": true,
  "/classes/messages/": true,
  "/classes/messages": true,
  "/classes/room1": true,
  "/classes/room": true
};

var recieved = {
  results: []
};
var count = 0;


























