var express = require('express');
var endpoint = express();

var cors = require('cors');
endpoint.use(cors());

var portNo = 3000;

endpoint.listen(portNo, function(){
    console.log('Listening on port ' + portNo);
});

// Get method route
endpoint.get('/newKweet', function(req, res){
    res.send('GET request to kweet');
});

// POST method route
endpoint.post('/newKweet', function(req, res){
    res.send('POST request kweet');
})