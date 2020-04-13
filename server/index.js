var app = require('express')();
var server = require('http').Server(app);
// Initialize Routes
require('./routes')(app);
// Setup Server in port 3000
server.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
// Expose App Object
exports = module.exports = app;
