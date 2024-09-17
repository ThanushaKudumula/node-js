const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/path', (req, res)=>{
    res.json(app.get("view engine"));
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const maxSize = 1 * 1000 * 1000;
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error("Error: File upload only supports the following filetypes - " + filetypes)
    );
  },
}).single("myfile"); 
app.get("/", function (req, res) {
  res.render("Signup"); 
});
app.post("/uploadProfilePicture", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err.message || err);
    } else {
        
      res.send("Success, Image uploaded!");
    }
  });
});

app.listen(5000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT 5000");
});
