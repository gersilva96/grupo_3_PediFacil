const multer = require('multer'); // file uploads
const path = require('path');
const productsController = require("../controllers/productsController")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, "img-prod" + productsController.getNewId() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('El formato de la imagen de producto sólo puede ser JPG, PNG, JPEG.'))
      }
    callback(null, true)
  }
}).single('image');

let uploadFile = {
  uploadFile: function (req,res,next) {
    upload(req, res, function(err){
      if(err) {
        console.log(err);
        return res.render("productAdd", {title: err});
      } else { next(); }
    });
  }
}

module.exports = uploadFile;