var webSocketServer = require('websocket').server; 
var http = require('http');
var server = http.createServer(function(request, response) {}); 
server.listen(1234, function() {
	console.log((new Date()) + " Server listen on port 1234");
});
var wsServer = new webSocketServer({
	httpServer: server 
});
// Array of connected clients
var clients = [ ];
wsServer.on('request', function(request) {
	console.log((new Date()) + ' Connexion of ' + request.origin + '.');
	//accept connexion
	var connection = request.accept(null, request.origin);
	//connected client index for close event
	var index = clients.push(connection) - 1;
	// when a client send message
	connection.on('message', function(message) {
	// brodcast message to all
	for (var i=0; i < clients.length; i++) { clients[i].sendUTF(message.utf8Data);
	}});
	// disconnect client
	connection.on('close', function(connection) { console.log((new Date()) + " User "
	+ connection.remoteAddress + " is disconnected.");
	// delete client from the list
	clients.splice(index, 1); });
});