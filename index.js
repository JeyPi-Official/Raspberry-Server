const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

const LED = require('./src/classes/LED');
const SERVO = require('./src/classes/Servo');

//var l = new LED(18);
var s1 = new SERVO(10);
var s2 = new SERVO(9);

const port = 8000;

var clients = [];

const io = new Server(server); //  Socket => ip + port

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = {};

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
      console.log(results['wlan0']);
    }
  }
}

//new socket connection
io.on("connection", (socket) => {
  var socketId = socket.id;
  let new_client = {
    client_id: socket.id,
    client_name: `client_${clients.length + 1}`,
  };
  clients.push(new_client);
  console.log(new_client.client_name + " has connected");

  // disconnect a user 
  socket.on("disconnect", () => {
    let index = 0;
    clients.forEach((client) => {
      if (socketId == client.client_id) {
        console.log(client.client_name + " has disconnected");
        clients.splice(index, 1);
      }
      index++;
    });
  });

  // send a message to the client
  let message = "Welcome " + socket.data;
  socket.emit("server", message);

  // receive a message from the client
  socket.on("client", (response) => {
    console.log(response);

    if (response == '!PlantOne') {
      s1.Mover(0);
      s2.Mover(0);
    }

    if (response == '!PlantTwo') {
      s1.Mover(1);
    }

    if (response == '!PlantThree') {
      s1.Mover(2);
    }

    if (response == '!PlantFour') {
      s1.Mover(2);
      s2.Mover(0);
    }

  });
});

server.listen(port, () => {
  console.log("server on port", port);
});

app.use(express.static(path.join(__dirname, '/src')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
