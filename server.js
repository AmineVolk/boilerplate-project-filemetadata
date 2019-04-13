"use strict";

var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });
// require and use "multer"...

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
  let file = req.file;
  console.log(`file ${JSON.stringify(file)}`);

  res.json({ name: file.originalname, type: file.mimetype, size: file.size });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
