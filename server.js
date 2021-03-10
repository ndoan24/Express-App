

// Require dependencies
var http = require("http");
var fs = require("fs");


// Set our port to 8080
var PORT = 8080;

// Create our server
var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {
// Capture the url the request is made to
    var path = req.url;

// When we visit different urls, read and respond with different files
    switch (path) {

        case "/":

        return renderHTML("/index.html", res);        
        case "/about":

        case "/contact":

            return renderHTML(path + ".html", res);

     // default to rendering index.html, if none of above cases are hit
     default:
         return display404(path, res);   
    
    }
};

// Create a function for handling the requests and responses coming into our server
function renderHTML(filePath, res) {

    // Here we use the fs package to read our index.html file
    //works with out  throw err
    return fs.readFile(__dirname + filePath, function(err, data) {
    if (err);
    // We then respond to the client with the HTML page by
    // specifically telling the browser that we are delivering an HTML file.
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(data);
    });
};

function display404(url, res) {
    var myHTML = "<HTML>" +
    "<body><h1>404 NOT FOUND</h1>" +
    "<p>The page you were looking for: " + url +" cannot be found.</p>" +
    "</body></html>";

  // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
  res.writeHead(404, { "Content-Type": "text/html" }); 

  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
 res.end(myHTML);
};

// Starts our server.
server.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT)
});