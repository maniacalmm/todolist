var db = require("../models");

exports.getTodos = function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.createTodo = function(req, res) {
    console.log(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

exports.showTodo = function(req, res) {
    db.Todo.findById(req.params.id)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.updateTodo = function(req, res) {
    db.Todo.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    })
};

exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.id})
    .then(function(todo) {
        res.json({msg: "deleted!"});
    })
    .catch(function(err) {
        res.send(err);
    })
}

module.exports = exports;