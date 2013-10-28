jQuery(function(){

var content = jQuery('#content');
window.WebSocket = window.WebSocket || window.MozWebSocket;
//connect to ws on localhost
var connection = new WebSocket('ws://127.0.0.1:1234'); connection.onerror = function (error) {
// when connection fails
content.html(jQuery('<p>', { text: 'Connection error</p>' } ));
};
// Listening to message send by server
connection.onmessage = function (message) { content.append('<p>'+message.data+'</p>');
}
//send text message to the server
jQuery("#send").click(function() {
	connection.send(jQuery('#input').val()); 
	jQuery('#input').val('');
	return false;
	});
});