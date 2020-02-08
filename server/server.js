require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const EventEmitter = require('events');

const event = new EventEmitter();
const app = express();
const jsonParser = bodyParser.json();

const wss = new WebSocket.Server({ port: process.env.REACT_APP_WSS_PORT });

app.get('/', (req, res) => {
  res.send('This server receives webhooks and relays them via websockets');
});

app.post('/webhooks', jsonParser, (req, res) => {
  const message = JSON.stringify(req.body);
  console.log(req.body);

  event.emit('webhookReceived', message);

  res.status(200).send('ok');
});

// fire websockets
wss.on('connection', function connection(ws) {
  // we're not receiving any messages here, and could probably just use
  // SSE but leaving this in just in case that changes later...

  // ws.on('message', function incoming(message) {
  //   console.log('r : %s', message);
  // });

  event.on('webhookReceived', function(json){
    ws.send(json);
  });
});

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Example app listening at http://127.0.0.1:${port}`));
