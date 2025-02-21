const express = require('express');
const mongoose = require('mongoose');
const Table = require('./table');

const dbURI = "Hidden";

const app = express(); // Our App
const port = process.env.PORT || 3000;

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const dispatcher = {"0": "monday", "1": "tuesday", "2": "wednesday", "3": "thursday", "4": "friday", "5": "saturday"};
const cdtime = 1673086300;

app.set('view engine', 'ejs');
app.set('views', './');

app.use(express.static(__dirname/*, {
 maxAge: 86400000 * 30
}*/));
app.use(express.json());

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(async (result) => {
    console.log("Connected to database");
    // https.createServer(options, app).listen(port, () => {
    //  console.log("Connected to server");
    // });
    server.listen(port, () => {
      console.log('Connected to server');
    })
  })
  .catch((err) => {
    console.log("Cannot connect to database:", err);
  });

process.on('uncaughtException', (err) => {
  console.log("Fatal Error:", err);
});

app.get('/', async (request, response) => {
  let table = (await Table.findOne({"id": "table1"})).data;
  response.render('index', {"tabledata": JSON.stringify(table), "cdtime": cdtime});
});

app.post('/pick', async (request, response) => {
  if (Math.floor(Date.now() / 1000) < cdtime) {
    response.send({msg: "Nice try, the countdown isn't over yet"});
    return;
  }
  let row = dispatcher[request.body.pos.slice(0, 1)];
  let col = request.body.pos.slice(1, 2);
  const Table = require('./table');
  let table = (await Table.findOne({"id": "table1"})).data;
  if (table[row][col] != "") {
    console.log(table[row][col])
    response.send({msg: "This duty has already been picked!"});
    return;
  }
  for (let rows in table) {
    let rows1 = rows
    rows = table[rows];
    for (let cols in rows) {
      let cols1 = cols;
      cols = rows[cols];
      if (cols == request.body.name) {
        let data = `data.${row}.${col}`;
        let data1 = `data.${rows1}.${cols1}`;
        let result = await Table.updateOne({"id": "table1"}, {$set: {[data1]: "", [data]: request.body.name}});
        if (result.acknowledged == true) {
          response.send({msg: "You have successfully picked this duty!"});
          io.sockets.emit("pickUpdate2", request.body.pos + request.body.name);
          return;
        } else {
          response.send({msg: "This duty has already been picked!"});
          return;
        }
      }
    }
  }
  let data = `data.${row}.${col}`;
  let result = await Table.updateOne({"id": "table1", [data]: ""}, {$set: {[data]: request.body.name}});
  if (result.acknowledged == true) {
    response.send({msg: "You have successfully picked this duty!"});
    io.sockets.emit("pickUpdate", request.body.pos + request.body.name);
    return;
  } else {
    response.send({msg: "This duty has already been picked!"});
    return;
  }
});

app.use(function (request, response, next) {
  response.sendStatus(404);
});
