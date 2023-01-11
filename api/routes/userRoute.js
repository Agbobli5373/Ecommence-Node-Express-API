const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
//POST route
router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User already exit",
        });
      } else {
        bcrypt
          .hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                Error: err,
              });
            } else {
              const user = new User({
                email: req.body.email,
                password: hash,
              });
              user.save().then((result) => {
                res.status(201).json({
                  message: "User Created",
                  result,
                });
              });
            }
          })
      }
    })
    .catch((err) => {
        res.status(500).json({
          Error: err,
        });
      });
});

//POST route
router.post("/", (req, res, next) => {
  res.status(200).json({ message: "Log in Route" });
});

//DELETE route
router.delete("/", (req, res, next) => {
  res.status(201).json({ message: "Delete User Route" });
});

module.exports = router;
