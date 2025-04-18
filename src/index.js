import { dashboardDOM, formDOM } from "./dom";
import { manipulateTodo } from "./todo";

//Create an instance of the imported object/ module for initialisation

const todoManipulator = manipulateTodo(); 
const dashboardDOMmanipulator = dashboardDOM();
const formDOMmanipulator = formDOM();
formDOMmanipulator.addFormDOM();

//test
// todoManipulator.createNewTodo("hi","hi","2024-04-18","High");
// console.log(todoManipulator.getAllTodo());
// dashboardDOMmanipulator.displayTodos(todoManipulator.getAllTodo());

const addTodoBtn = document.querySelector("button#addTodo");
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");

//display empty form
addTodoBtn.addEventListener("click", () => dialog.showModal());

//form buttons eventHandler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    todoManipulator.createNewTodo(...retrieveFormInput());
    dashboardDOMmanipulator.displayTodos(todoManipulator.getAllTodo());
    form.reset();
    dialog.close();
})

const cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();})



//formEventHandler
function retrieveFormInput () {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dd").value;
    const priority = document.getElementById("priority").value;
    
    return [title, description, dueDate, priority];
}

