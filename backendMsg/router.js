const express = require("express");
const router = express.Router();
const {getSalas,getUsers} = require('./usersAndrooms');

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});


router.get("/getSalas", (req, res) => {
  res.send(
    getSalas()
  ).status(200);
});
router.get("/getUsers", (req, res) => {
  res.send(
    getUsers()
  ).status(200);
});


module.exports = router;