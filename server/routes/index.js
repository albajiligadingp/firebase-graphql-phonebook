const express = require('express');
const router = express.Router();
const firebase = require('firebase');

router.get('/', function (req, res, next) {
  const userReference = firebase.database().ref("/phonebook/");
  //Attach an asynchronous callback to read the data
  userReference.on("value", function (snapshot) {
    res.json(snapshot.val());
    userReference.off("value");
  }, function (errorObject) {
    res.send("The read failed: " + errorObject.code);
  });
});

router.post('/', function (req, res) {
  const id = Date.now();
  const name = req.body.name;
  const phone = req.body.phone;

  const referencePath = '/phonebook/' + id + '/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({ name: name, phone: phone }, function (error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send("Data saved successfully.");
    }
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var phone = req.body.phone;

  var referencePath = '/phonebook/' + id + '/';
  var userReference = firebase.database().ref(referencePath);
  userReference.update({ name: name, phone: phone }, function (error) {
    if (error) {
      res.send("Data could not be updated." + error);
    } else {
      res.send("Data updated successfully.");
    }
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  var referencePath = '/phonebook/' + id + '/';
  var userReference = firebase.database().ref(referencePath);
  userReference.remove((error) => {
    if (error) {
      res.send("Data could not be deleted." + error);
    } else {
      res.send("Data deleted successfully.");
    }
  })
});

module.exports = router;
