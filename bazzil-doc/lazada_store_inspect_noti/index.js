var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8081);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
    console.log("Have a connection!")
  socket.on('push-noti', function (data) {
    console.log("received:" + data);
    socket.broadcast.emit("get-noti",data);
    console.log("emited:" + data);
  });
});