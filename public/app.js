$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err) {
        console.log(err);
    });

    $('#todoInput').keypress(function(event) {
        if (event.which === 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function(e){
        updateTodo($(this));
    })
});

function updateTodo(item){
    console.log(item);
    var status = item.data("complete");
    var url = '/api/todos/' + item.data("id");
    $.ajax({
        method: 'PUT',
        url: url,
        data: {completed: !status}
    })
    .then(function(todo) {
        console.log(todo);
        if (todo.completed) item.addClass('done');
        else item.removeClass('done');

        item.data("complete", todo.completed);
    })
    .catch(function(err) {
        console.log(err);
    })

}

function removeTodo(item) {
    var id = item.data('id');
    item.remove();
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + id
    }).then(function(data) {
        console.log(data);
    }).catch(function(err) {
        console.log(err);
    });
}

function addTodos(todos) {
    todos.forEach(function(todo) {
        addtodo(todo);
    });
}

function addtodo(todo) {
    var newTodo = $("<li>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("complete", todo.completed);
    newTodo.addClass("task");
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createTodo() {
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {
        name: userInput
    })
    .then(function(todo) {
        addtodo(todo);
        $("#todoInput").val("");
    })
    .catch(function(err) {
        console.log(err);
    })
}