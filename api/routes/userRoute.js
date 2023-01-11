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
                USER :{
                    Email : result.email,
                    Password : result.password
                }
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

//POST route
router.post("/", (req, res, next) => {
  res.status(200).json({ message: "Log in Route" });
});

//DELETE route
router.delete("/:email", (req, res, next) => {
    const id = req.body.userId;   
    User.remove({email:req.body.email})
        .exec()
        .then((resut)=>{
            res.status(200).json({
              messgae : "User is Deleted successful"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                Error : err
            })
        })
});

router.get('/',(req,res,next)=>{
    User.find({})
        .exec()
        .then((result)=>{
            res.status(200).json({
                User : result.map((user)=>{
                    return (
                        {
                            _id : user._id,
                            email : user.email
                        }
                    )
                })
            })
           
        })
        .catch((err)=>{
            res.status(500).json({
                Error : err
            })
        })
})

module.exports = router;
