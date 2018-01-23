var express = require("express"),
    app = express(),
    port = process.env.PORT || 4000,
    bodyParser = require("body-parser");


var db = require("./models/");

var todoRoutes = require("./routes/todos");


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/todos", todoRoutes);

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.listen(port, function () {
    console.log("serving now at: ", port);
});