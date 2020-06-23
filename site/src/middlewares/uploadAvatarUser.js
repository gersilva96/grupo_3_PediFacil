const multer = require('multer'); // file uploads
const path = require('path');
const usersController = require("../controllers/usersController")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'public/images/avatars')
  },
  filename: function (req, file, cb) {
    cb(null, "avatar-" + usersController.getNewId() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('El formato del avatar sólo puede ser JPG, PNG, JPEG.'))
      }
    callback(null, true)
  }
}).single('avatar');

let uploadFile = {
  uploadFile: function (req,res,next) {
    upload(req, res, function(err){
      if(err) {
        console.log(err);
        return res.render("login", {title: err});
      } else { next(); }
    });
  }
}

module.exports = uploadFile;