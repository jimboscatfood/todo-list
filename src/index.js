import "./styles.css";

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
formDOMmanipulator.addProjectFormDOM();

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
    todoForm.reset();
    todoDialog.close();
    todoManipulator.updateArr();
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
    formDOMmanipulator.updateFormDOM(projectManipulator.getProjectList());
})

//formEventHandler
function todoFormInput () {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dd").value;
    const priority = document.getElementById("priority").value;
    const projectIndex = parseInt(document.getElementById("project").value);

    return [title, description, dueDate, priority,projectIndex];
}

function projectFormInput () {
    const projectTitle = document.getElementById("projectTitle").value;

    return projectTitle;
}

//siderbar default project section handler
const defaultProject = document.querySelector(".default");
const defaultBtns = defaultProject.querySelectorAll("button");

defaultBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        dashboardDOMmanipulator.displayTodos(retrieveTodoArr(e.target.id));
    })
})

function retrieveTodoArr (buttonID) {
    switch (buttonID) {
        case "all":
            return todoManipulator.getAllTodo();
            break;
        case "today":
            return todoManipulator.getTodayTodo();
            break;
        case "scheduled":
            return todoManipulator.getScheduledTodo();
            break;
        case "important":
            return todoManipulator.getImportantTodo();
            break;
        case "completed":
            return todoManipulator.getCompletedTodo();
    }
}

//siderbar user defined project section handler
const userProjects = document.querySelector(".projects");

userProjects.addEventListener("click", (e) => {
    
    const projectBtns = userProjects.querySelectorAll("button");
    projectBtns.forEach((button, index) => {
        if (e.target.tagName === "BUTTON" && e.target === button) {
            retrieveProjectTodo(index) !== undefined? dashboardDOMmanipulator.displayTodos(retrieveProjectTodo(index)):dashboardDOMmanipulator.displayTodos([]);
        }
    })
})
//Note that the project buttons are displayed from top down based on their sequence in the project list array

function retrieveProjectTodo(projectIndex) {
    const projectTodo = todoManipulator.getProjectsTodo();
    return projectTodo[projectIndex];
}


