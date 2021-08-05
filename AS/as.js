const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());
var CryptoJS = require('crypto-js');

const fs = require('fs');
const { uuid } = require('uuidv4');
// var jsonParser = bodyParser.json();

app.get('/auth', async (req, res) => {
  const userCred = {
    uuid: req.query.uuid,
    hashKey: req.query.password,
  };
  console.log(req.query.uuid);
  var file = fs.readFileSync('/home/toothlexx/Github_linked_projects/Mini-Projects/kerboros/DB/user.json');
  var FileData = JSON.parse(file);
  console.log(FileData['users']);
  var userFound = {
    status: false,
    isValid: false,
    user: {},
  };
  var TGT = {
    clientId: userCred.uuid,
    IP: '127.0. 0.1:3000',
    timeStamp: new Date().getTime() / 1000,
    lifeTime: 5,
    TGSSecretKey: '488bca4e-49b7-45b4-b8e0-3a9758669c6d',
    session1Key: uuid(),
  };
  FileData['users'].map((data, index) => {
    console.log(data);
    if (data['uuid'] == userCred.uuid) {
      if (data['passwordHash'] == userCred.hashKey) {
        userFound = {
          status: true,
          isValid: true,
          user: data,
        };
      } else {
        userFound = {
          status: true,
          isValid: false,
          user: data,
        };
      }
    }
  });
  if (userFound.status) {
    if (userFound.isValid) {
      var encrypt = CryptoJS.AES.encrypt(JSON.stringify(TGT), userCred.hashKey).toString();
      res.status(200).send({
        cipherCode: encrypt,
      });
    } else {
      res.status(400).send({
        message: 'Invalid auth',
      });
    }
  } else {
    res.status(400).send({
      message: 'Not FOund',
    });
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`listening on port  ${port} `);
});
