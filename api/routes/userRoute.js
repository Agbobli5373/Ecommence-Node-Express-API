const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const key = "Ayuba";

//Sign up route
router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User Email already exit",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
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
                USER: {
                  Email: result.email,
                  Password: result.password,
                },
              });
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
});

//DELETE User route
router.delete("/:email", (req, res, next) => {
  const id = req.params.userId;
  User.remove({ email: req.params.email })
    .exec()
    .then((resut) => {
      res.status(200).json({
        messgae: "User is Deleted successful",
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
});

//Update User route
router.patch("/userId", (req, res, next) => {
  const id = req.params.userId;
  User.findByIdAndUpdate({ _id: id }, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: `User with ${id} is update Successfull`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
});

//GET Users route
router.get("/", (req, res, next) => {
  User.find({})
    .exec()
    .then((result) => {
      res.status(200).json({
        User: result.map((user) => {
          return {
            _id: user._id,
            email: user.email,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
});

//Login Route
router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: " Auth Fail",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Fail",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            'secret',
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth Success",
            Token: token,
          });
        }
        res.status(401).json({
          message: "Auth Fail",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
});
module.exports = router;
