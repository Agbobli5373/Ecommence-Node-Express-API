const express = require("express");
const router = express.Router();
const multer = require('multer') ;
const ProductCtrl = require('../controllers/productCtrl');
const checkAuth = require('../middlerware/check-auth')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


//GET Product route
router.get("/",ProductCtrl.getAllProducts);

//POST route
router.post("/", checkAuth ,upload.single('productImage'), ProductCtrl.addProduct);
//DELETE Product Route
router.delete("/:productId", checkAuth, ProductCtrl.deleteProduct);
//GET Single Product route
router.get("/:productId", ProductCtrl.getProduct);
//UPDATE Product Route
router.patch("/:productId",checkAuth, ProductCtrl.updateProduct);

module.exports = router;
