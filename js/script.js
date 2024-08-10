"use strict";
let todos = localStorage.getItem("todos")

if (todos === null) {
    todos = [
        {content: "Follow @3equoia Github", status: true},
        {content: "Like this repo", status: true},
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(JSON.parse(todos))
}


try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch (e) {
    todos = null
    
}


if (!todos) {
    todos = [
        {content: "Follow @3equoia Github", status: true},
        {content: "Like this repo", status: true},
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}


function createTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.style.textDecoration = todo.status ? "initial" : "line-through"
        let text = todo.content        
        let span = document.createElement("span")
        let btn = document.createElement("i")
        btn.className = "bi bi-trash3-fill"
        li.className = "list-item"
        span.className = "trash"
        
        li.append(text)
        li.append(span)
        span.append(btn)
        todosList.append(li)
        
        btn.addEventListener("click", e => {
            todos.splice(index, 1)
            createTodos(todos)
            localStorage.setItem("todos", JSON.stringify(todos))
        })

        li.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    });
}

createTodos(todos)


let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(act => {
    if (act.dataset.action === "add") {
        act.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form action="" id="add">
                        <input class="" autofocus name="add" placeholder="Add Todo:">
                </form>
            `
            createTodos(todos)
            let add = document.querySelector("#add")
            add.addEventListener("submit", e => {
                e.preventDefault()
                if (add.add.value) {
                    todos.push({content: add.add.value, status: true})
                    localStorage.setItem("todos", JSON.stringify(todos))
                    createTodos(todos)
                } 
                add.add.value = ""
            })

        })
    } else if (act.dataset.action === "search") {
        act.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form action="" id="search">
                    <input class="form-search" autofocus name="search" placeholder="Search Todos:">
                </form>
            `
            let search = document.querySelector("#search")
            search.addEventListener("keyup", e => {
                e.preventDefault();
                if (search.search.value) {
                    let filterTodo = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filterTodo)
                    e.preventDefault();

                } else {
                    createTodos(todos)
                }
            })
        })
    }
})