let dotenv = require('dotenv').config(); //loads the environment variables
let bodyParser = require('body-parser')
let express = require('express');
let app = express();
app.use("/public", express.static(__dirname + "/public"));
app.use(function (req, res, next) {
 let string = req.method + " " + req.path + " - " + req.ip;
 console.log(string);
 next();
});

app.use( bodyParser.urlencoded({extended: false}) )

app.get("/", (req, res) => {
 let absolutePath = __dirname + '/views/index.html';
 res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
 if (process.env.MESSAGE_STYLE === "uppercase") {
  res.json({
   message: "HELLO JSON"
  });
 } else {
  res.json({
   message: "Hello json"
  });
 }
})

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({
    "time": req.time
  });
});

app.get("/:word/echo", (req, res) => {
  res.json({
    "echo": req.params.word
  })
})

app.route("/name").get((req, res) => {
  let firstname = req.query.first;
  let lastname = req.query.last;
  res.json({
    "name": `${firstname} ${lastname}`
  })
}).post((req,res) => {
  let firstname = req.body.first;
  let lastname = req.body.last;
  res.json({
    "name": `${firstname} ${lastname}`
  })
});
























 module.exports = app;
