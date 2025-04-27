import "./styles.css";

import { dashboardDOM, formDOM, sidebarDOM} from "./dom";
import manipulateTodo from "./todo";
import manipulateProjects from "./project";

export default eventHandler;

const todoManipulator = manipulateTodo();
const projectsManipulator = manipulateProjects();
const dashboard = dashboardDOM();
const form = formDOM();
const sidebar = sidebarDOM();

function eventHandler() {
    let activeProject = {
        projectType:"default",
        projectIndex:0,
    };

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
        todoManipulator.updateTodoLists();
        dashboard.displayTodos(getTodoItems(activeProject));
        console.log(getTodoItems(activeProject));
    })

    //form cancel button general eventhandler 
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
        projectsManipulator.createProject(projectFormInput());
        projectForm.reset();
        projectDialog.close();
        sidebar.updateProjectList(projectsManipulator.getProjectList());
        form.updateFormDOM(projectsManipulator.getProjectList());
    })

    //formEventHandler
    function todoFormInput () {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dd").value;
        const priority = document.getElementById("priority").value;
        const projectIndex = parseInt(document.getElementById("project").value);

        return [title, description, dueDate, priority, projectIndex];
    }

    function projectFormInput () {
        const projectTitle = document.getElementById("projectTitle").value;

        return projectTitle;
    }


    //siderbar handler
    const navbar = document.querySelector("nav");
    const defaultSection = document.querySelector(".default");
    const userProjSection = document.querySelector(".projects");

    navbar.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON" && e.target.classList.contains("projectBtn")) {
                changeActiveProject(e.target);
                dashboard.displayTodos(getTodoItems(activeProject));
            }
    })

    function changeActiveProject(target) {
        if (defaultSection.contains(target)) {
            activeProject.projectType = "default";
            const projectBtns = defaultSection.querySelectorAll("button");
            projectBtns.forEach((button, index) => {
                if (target === button) {
                        activeProject.projectIndex = index;
                    }
                })
            }
        
        else if (userProjSection.contains(target)) {
            activeProject.projectType = "user-defined";
            const projectBtns = userProjSection.querySelectorAll("button");
            projectBtns.forEach((button, index) => {
                if (target === button) {
                    activeProject.projectIndex = index;
                    }
                })
            }
        }
    

    //return a specific array based on 1. project type (default/ user-defined) 2. project index
    function getTodoItems({projectType, projectIndex}) {
        if (projectType === "default") {
            const project = todoManipulator.getDefaultProject();
            return project[projectIndex].todoItems;
        }
        else if (projectType === "user-defined") {
            const project = todoManipulator.getUserProject();
            return project[projectIndex] !== undefined? project[projectIndex]: [];
        }
    }

}