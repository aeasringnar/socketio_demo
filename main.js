var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('all msg', '有新人加入啦！'); // 除本连接外，给所有人发消息
  

  socket.on('disconnect', function(){
    console.log('有链接断开');
  });

  socket.on('chat message', function(event) {
    console.log(event)
    socket.send('收到消息') // 给当前链接发消息
    // socket.broadcast.emit('all msg', '有新人加入啦！');
    io.emit('message','所有连接将收到此消息') // 给当所有链接发消息
  });
  

});

io.on('close', (event) => {
  console.log('有链接断开')
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    