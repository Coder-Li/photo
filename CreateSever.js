app = require('./app');
http = require('http');

http.createServer(app).listen(3000, function (){
    console.log("Sever open at 3000 port!");
})