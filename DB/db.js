const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());

var SHA256 = require('crypto-js/sha256');
const fs = require('fs');
const { randomUUID } = require('crypto');
var jsonParser = bodyParser.json();
// const fileAddress = '/home/toothlexx/Github_linked_projects/Mini-Projects/kerboros/DB/user.json';
const fileAddress = 'user.json';

app.post('/addUser', jsonParser, async (req, res, callback) => {
  console.log('------------------ADDING-----------------------');
  console.log(res.body);
  var data = {
    name: req.query.name,
    passwordHash: req.query.passwordHash,
    email: req.query.email,
    session: { available: true, sessionKey: '', totalSession: 0 },
    uuid: req.query.email,
  };
  console.log(data);
  var RFile = fs.readFileSync(fileAddress);
  var RFileData = JSON.parse(RFile);
  console.log(RFileData['users']);
  var userFound = {
    status: false,
    user: {},
  };
  if (RFileData['users'].length >= 1) {
    RFileData['users'].map((RData, index) => {
      console.log(RData['email'] == data['email']);
      if (RData['email'] == data['email']) {
        userFound.status = true;
        userFound.user = data;
      }
    });
  }
  if (userFound.status) {
    res.status(400).send({ error: 'already' });
  } else {
    var file = fs.readFileSync(fileAddress);
    var FileData = JSON.parse(file);
    console.log(FileData);
    FileData['users'].push(data);
    var json = JSON.stringify(FileData);
    var write = fs.writeFileSync(fileAddress, json);
    res.status(200).send({ status: 'ok' });
  }
});

app.get('/getUser', async (req, res, callback) => {
  console.log(req.query.uuid);
  var file = fs.readFileSync(fileAddress);
  var FileData = JSON.parse(file);
  console.log(FileData['users']);
  var userFound = {
    status: false,
    user: {},
  };
  FileData['users'].map((data, index) => {
    console.log(data);
    if (data['uuid'] == req.query.uuid) {
      userFound.status = true;
      userFound.user = data;
    }
  });
  if (userFound.status) {
    res.status(200).send(userFound.user);
  } else {
    res.send(400).send('Not Found');
  }
});

app.get('/allUser', async (req, res, callback) => {
  var file = fs.readFileSync(fileAddress);
  var FileData = JSON.parse(file);
  console.log(FileData['users']);
  res.status(200).send(FileData['users']);
});

app.delete('/deleteAll', async (req, res, callback) => {
  var FileData = {
    users: [],
  };
  var json = JSON.stringify(FileData);
  var write = fs.writeFileSync(fileAddress, json);
  res.status(200).send('deleted');
});

app.get('/checkSessionAvailability', async (req, res, callback) => {
  console.log(req.query.uuid);
  var file = fs.readFileSync(fileAddress);
  var FileData = JSON.parse(file);
  console.log(FileData['users']);
  var session = {
    available: false,
    sessionKey: {},
  };
  FileData['users'].map((data, index) => {
    console.log(data);
    if (data['uuid'] == req.query.uuid) {
      session.available = data['session']['available'];
    }
  });
  if (session.available) {
    res.status(200).send({
      available: true,
    });
  } else {
    res.send(200).send({
      available: false,
    });
  }
});

app.put('/updateSession', async (req, res, callback) => {
  var file = fs.readFileSync(fileAddress);
  var FileData = JSON.parse(file);
  console.log(FileData['users']);
  var session = {
    uuid: req.query.uuid,
    available: req.query.sessionState,
    sessionKey: req.query.sessionKey,
  };
  FileData['users'].map((data, index) => {
    console.log(data);
    if (data['uuid'] == req.query.uuid) {
      session.available = data['session']['available'];
    }
  });
  if (session.available) {
    res.status(200).send({
      available: true,
    });
  } else {
    res.send(200).send({
      available: false,
    });
  }
});

const port = 2000;

app.listen(port, () => {
  console.log(`listening on port  ${port} `);
});
