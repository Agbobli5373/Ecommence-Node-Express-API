const express = require("express");
const router = express.Router();
const userContrl = require('../controllers/userCtrl');
const checkAuth = require('../middlerware/check-auth');


//Sign up route
router.post("/signup", userContrl.signUp);

//Login Route
router.post("/login",userContrl.signIn);

//DELETE User route
router.delete("/:email",checkAuth, userContrl.deleteUser);

//Update User route
router.patch("/userId", checkAuth, userContrl.updateUser);

//GET Users route
router.get("/", userContrl.getUsers);


module.exports = router;
