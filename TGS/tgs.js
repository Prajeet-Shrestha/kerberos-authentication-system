const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());
var CryptoJS = require('crypto-js');

const fs = require('fs');
const { uuid } = require('uuidv4');
// var jsonParser = bodyParser.json();

app.get('/tgs', async (req, res) => {
  //   var TGT = {
  //     clientId: userCred.uuid,
  //     IP: '127.0. 0.1:3000',
  //     timeStamp: new Date().getTime() / 1000,
  //     lifeTime: 5,
  //     TGSSecretKey: '488bca4e-49b7-45b4-b8e0-3a9758669c6d',
  //     session1Key: uuid(),
  //   };
  const data = {
    TGSSecretKey: '488bca4e-49b7-45b4-b8e0-3a9758669c6d',
    cipherCode: req.query.code.toString(),
  };
  console.log(data);

  var decData = CryptoJS.enc.Base64.parse(data.cipherCode).toString(CryptoJS.enc.Utf8);
  var bytes = CryptoJS.AES.decrypt(decData, data.TGSSecretKey).toString(CryptoJS.enc.Utf8);
  var decryptedData = JSON.parse(bytes);
  console.log(decryptedData);
  var currentTime = new Date().getTime() / 1000;
  var lifeSpan = decryptedData.lifeTime * 60;
  var createdTime = decryptedData.timeStamp;
  console.log('Ex time:', createdTime + lifeSpan);
  console.log('currentTime:', currentTime);

  if (Math.round(createdTime + lifeSpan, 1) >= Math.round(currentTime, 1)) {
    console.log('Time On going');

    var TGS = {
      clientId: decryptedData.clientId,
      IP: '127.0. 0.1:3000',
      timeStamp: new Date().getTime() / 1000,
      lifeTime: 1,
      session2Key: uuid(),
    };
    var encrypt = CryptoJS.AES.encrypt(JSON.stringify(TGS), decryptedData.session1Key).toString();
    res.status(200).send({
      cipherCode: encrypt,
    });
  } else {
    console.error('Time Expired');

    res.status(400).send({
      error: 'expired',
    });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`listening on port  ${port} `);
});
