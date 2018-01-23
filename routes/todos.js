var express = require("express");
var router = express.Router();
var db = require("../models/");
var helpers = require("../router_helpers/todos");


router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:id')
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);


module.exports = router;