import "./styles.css";

import { dashboardDOM, formDOM, sidebarDOM} from "./dom";
import manipulateTodo from "./todo";
import manipulateProjects from "./project";
import storage from "./storage";

export default eventHandler;

function eventHandler() {
    const todoManipulator = manipulateTodo();
    const projectsManipulator = manipulateProjects();
    const dashboard = dashboardDOM();
    const form = formDOM();
    const sidebar = sidebarDOM();
    const storageManipulator = storage();

    let editingMode = false;
    let editTodoIndex;
    let activeProject = {
        projectType:"default",
        projectIndex:0,
    };

    const existingProjects = () => projectsManipulator.getProjectList();
    const allTodoItems = () => todoManipulator.getAllTodoItems();
    const activeProjectTitle = (activeProject) => getProjectTitle(activeProject);
    const activeTodoItems = (activeProject) => getTodoItems(activeProject);
    
    const localStorageArr = storageManipulator.getStorage();
      

    //display localStorage data when DOM content load, mainly project sidebar and todo dashboard

    window.addEventListener("DOMContentLoaded", () => {
        if (localStorageArr[0] !== null || localStorageArr[1] !== null || localStorageArr[2] !== null) {
            todoManipulator.setAllTodoItems(localStorageArr[0]);
            projectsManipulator.setProjectList(localStorageArr[1]);
            activeProject = localStorageArr[2];
            todoManipulator.updateTodoLists(existingProjects());
        }
        dashboard.displayTodos(activeProject,activeProjectTitle(activeProject),activeTodoItems(activeProject));
        sidebar.updateProjectList(existingProjects());
    })


    const addTodoBtn = document.querySelector("button#addTodo");
    const addProjectBtn = document.querySelector("button#addProject");
    const dialog = document.querySelector("dialog");

    //display empty todo form
    addTodoBtn.addEventListener("click", () => {
        editingMode = false;
        form.addNewTodoForm(existingProjects());
        dialog.showModal();
    })

    //display empty project form
    addProjectBtn.addEventListener("click", () => {
        form.addNewProjectForm();
        dialog.showModal();
    })

    dialog.addEventListener("click", (e) => {
        const currentForm = dialog.querySelector("form");

        if (currentForm.classList.contains("newTodoForm")) {
            if (e.target.type === "submit" && currentForm.checkValidity()) {
                e.preventDefault();
                todoManipulator.createNewTodo(...getTodoFormInput());
                todoManipulator.updateTodoLists(existingProjects());
                dashboard.displayTodos(activeProject,activeProjectTitle(activeProject),activeTodoItems(activeProject));
                dialog.close();
                dialog.textContent = "";
            }
            else if (e.target.classList.contains("cancelBtn")) {
                dialog.close();
                dialog.textContent = "";
            }
        }
        else if (currentForm.classList.contains("projectForm")) {
            if (e.target.type === "submit" && currentForm.checkValidity()) {
                e.preventDefault();
                projectsManipulator.createProject(getProjectFormInput());
                sidebar.updateProjectList(existingProjects());
                todoManipulator.updateTodoLists(existingProjects());
                dialog.close();
                dialog.textContent = "";
            }
            else if (e.target.classList.contains("cancelBtn")) {
                dialog.close();
                dialog.textContent = "";
            }
        }
        else if (currentForm.classList.contains("editTodoForm")) {
            if (e.target.type === "submit" && currentForm.checkValidity()) {
                e.preventDefault();
                todoManipulator.editTodo(editTodoIndex, ...getTodoFormInput());
                todoManipulator.updateTodoLists(existingProjects());
                dashboard.displayTodos(activeProject,activeProjectTitle(activeProject), activeTodoItems(activeProject));
                dialog.close();
                dialog.textContent = "";
                editingMode = false;
            }
            else if (e.target.classList.contains("cancelBtn")) {
                dialog.close();
                dialog.textContent = "";
                editingMode = false;
            }
        }
        storageManipulator.setStorage(allTodoItems(),existingProjects(),activeProject)
    })

    //formEventHandler
    function getTodoFormInput () {
        if (editingMode === false) {
            const title = document.getElementById("newTitle").value;
            const description = document.getElementById("newDescription").value;
            const dueDate = document.getElementById("newDd").value;
            const priority = document.getElementById("newPriority").value;
            const projectIndex = document.getElementById("newProject").value;

            return [title, description, dueDate, priority, projectIndex];
        }
        else if (editingMode === true) {
            const title = document.getElementById("editTitle").value;
            const description = document.getElementById("editDescription").value;
            const dueDate = document.getElementById("editDd").value;
            const priority = document.getElementById("editPriority").value;
            const projectIndex = document.getElementById("editProject").value;

            return [title, description, dueDate, priority, projectIndex];
        }
    }

    function getProjectFormInput () {
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
                dashboard.displayTodos(activeProject,activeProjectTitle(activeProject), activeTodoItems(activeProject));
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
            storageManipulator.setStorage(allTodoItems(),existingProjects(),activeProject);
        }
    

    //return a specific array based on 1. project type (default/ user-defined) 2. project index
    function getTodoItems ({projectType, projectIndex}) {
        if (projectType === "default") {
            const project = todoManipulator.getDefaultProject();
            return project[projectIndex].todoItems;
        }
        else if (projectType === "user-defined") {
            const project = todoManipulator.getUserProject();
            return project[projectIndex];
        }
    }

    function getProjectTitle ({projectType, projectIndex}) {
        if (projectType === "default") {
            const project = todoManipulator.getDefaultProject();
            return project[projectIndex].name;
        }
        else if (projectType === "user-defined") {
            const project = existingProjects();
            return project[projectIndex].name;
        }
    }

    //todo itembox handler
    const todoDisplayBoard = document.getElementById("todos");
    //show form with existing details

    todoDisplayBoard.addEventListener("click", (e) => {
        editTodoIndex = parseInt(e.target.parentNode.dataset.itemIndex);
        if (e.target.classList.contains("todoDetails")) {
            editingMode = true;
            form.addEditTodoForm(existingProjects(), allTodoItems()[editTodoIndex]);
            dialog.showModal();
        }
        else {
            if (e.target.classList.contains("deleteTodo")) {
                if (confirm("Remove this todo item permanently?")) {
                    todoManipulator.deleteTodo(editTodoIndex);
                }
            }
            else if (e.target.type === "checkbox") {
                todoManipulator.checkTodo(editTodoIndex);
            }
            else if (e.target.classList.contains("deleteProject")) {
                if (confirm("Remove this project?")) {
                    projectsManipulator.deleteProject(activeProject.projectIndex);
                    todoManipulator.updateTodoProjectIndex(activeProject);
                    sidebar.updateProjectList(existingProjects());
                    activeProject.projectIndex = 0;
                    activeProject.projectType = "default";
                }
            }
            todoManipulator.updateTodoLists(existingProjects());
            dashboard.displayTodos(activeProject,activeProjectTitle(activeProject),activeTodoItems(activeProject));
            storageManipulator.setStorage(allTodoItems(),existingProjects(),activeProject);
        }
    })
}
