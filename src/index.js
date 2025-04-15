import { formDOM } from "./dom";

//Create an instance of the imported object/ module for initialisation

const manipulateFormDOM = formDOM();
manipulateFormDOM.addFormDOM();

const addTodo = document.querySelector("button#addTodo");
const dialog = document.querySelector("dialog");

addTodo.addEventListener("click", () => dialog.showModal());


