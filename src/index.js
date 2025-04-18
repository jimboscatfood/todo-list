import { dashboardDOM, formDOM, sidebarDOM } from "./dom";
import { manipulateTodo } from "./todo";
import { manipulateProjects } from "./project";

//Create an instance of the imported object/ module for initialisation

const todoManipulator = manipulateTodo(); 
const dashboardDOMmanipulator = dashboardDOM();
const projectManipulator = manipulateProjects();
const formDOMmanipulator = formDOM();
const sidebarDOMmanipulator = sidebarDOM();

//add layout DOM
formDOMmanipulator.addFormDOM();
sidebarDOMmanipulator.addProjectFormDOM();

const addTodoBtn = document.querySelector("button#addTodo");
const addProjectBtn = document.querySelector("button#addProject");
const todoForm = document.querySelector(".todoForm");
const todoDialog = document.querySelector("#newTodo");
const projectForm = document.querySelector(".projectForm");
const projectDialog = document.querySelector("#newProject");

//display empty todo form
addTodoBtn.addEventListener("click", () => todoDialog.showModal());

//display empty project form
addProjectBtn.addEventListener("click", () => projectDialog.showModal());

//todoForm buttons eventHandler
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    todoManipulator.createNewTodo(...todoFormInput());
    dashboardDOMmanipulator.displayTodos(todoManipulator.getAllTodo());
    todoForm.reset();
    todoDialog.close();
})
const cancelBtns = document.querySelectorAll(".cancelBtn");
cancelBtns.forEach((button) => { 
    button.addEventListener("click", (e) => {
    const currentForm = e.target.parentElement.parentElement;
    const currentDialog = currentForm.parentElement;
    currentForm.reset();
    currentDialog.close();})
})

//projectForm buttons eventHandler
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    projectManipulator.createProject(projectFormInput());
    projectForm.reset();
    projectDialog.close();
    sidebarDOMmanipulator.updateProjectList(projectManipulator.getProjectList());
})

//formEventHandler
function todoFormInput () {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dd").value;
    const priority = document.getElementById("priority").value;
    
    return [title, description, dueDate, priority];
}

function projectFormInput () {
    const projectTitle = document.getElementById("projectTitle").value;

    return projectTitle;
}

