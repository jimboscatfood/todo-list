//Create a module for adding DOM to the page
import manipulateTodo from "./todo";
export {initialiseDOM, dashboardDOM, formDOM, sidebarDOM};


const ui = document.querySelector("div#ui");
const dialog = document.createElement("dialog");

function initialiseDOM () {
    ui.appendChild(dialog);

    const todo = manipulateTodo();
    const sidebar = sidebarDOM();
    sidebar.addDefaultProjects(todo.getDefaultProject());
}

function dashboardDOM() {
    const todosContent = document.querySelector("div#todos");

    function displayTodos(todoArr) {
        //Clear page first
        todosContent.textContent = "";
        todoArr.forEach((todoItem) => {
            const itemBox = document.createElement("div");
            itemBox.setAttribute("data-item-index", todoItem.itemIndex);
            itemBox.classList.add("itemBox");
            todosContent.appendChild(itemBox);

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            todoItem.checklist === true? checkbox.checked = true: checkbox.checked = false;

            const todoTitle = document.createElement("h3");
            todoTitle.textContent = todoItem.title;

            const todoDueDate = document.createElement("p");
            todoDueDate.textContent = todoItem.dueDate;

            const detailsButton = document.createElement("button");
            detailsButton.classList.add("todoDetails");
            detailsButton.textContent = "Details";

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteTodo");
            deleteButton.appendChild(document.createElement("img"));

            itemBox.append(checkbox, todoTitle, todoDueDate, detailsButton, deleteButton);
        })
    }


        return {
            displayTodos,
        }
};

function formDOM() {
    //this function add the dialog form to the DOM tree, should only be run once when the webpage first renders
    function addNewTodoForm(existingProjects) {
        const form = document.createElement("form");
        form.classList.add("newTodoForm");
        form.setAttribute("method","dialog");
        
        const titleWrapper = document.createElement("p");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input")
        titleInput.setAttribute("id","newTitle");
        titleInput.setAttribute("name","title");
        titleInput.setAttribute("required","");
        titleLabel.setAttribute("for","title");
        titleLabel.textContent = "Task title:";
        titleWrapper.append(titleLabel, titleInput);

        const descriptionWrapper = document.createElement("p");
        const descriptionLabel = document.createElement("label");
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("id","newDescription");
        descriptionInput.setAttribute("name","description");
        descriptionLabel.setAttribute("for","description");
        descriptionLabel.textContent = "Description:";
        descriptionWrapper.append(descriptionLabel, descriptionInput);

        const ddWrapper = document.createElement("p");
        const ddLabel = document.createElement("label");
        const ddInput = document.createElement("input");
        ddInput.setAttribute("id","newDd");
        ddInput.setAttribute("name","dd");
        ddInput.setAttribute("type","date");
        ddLabel.setAttribute("for","dd");
        ddLabel.textContent = "Due date:";
        ddWrapper.append(ddLabel, ddInput);
        
        const priorityWrapper = document.createElement("p");
        const priorityLabel = document.createElement("label");
        const priorityInput = document.createElement("select");
        priorityInput.setAttribute("id","newPriority");
        priorityInput.setAttribute("name","priority");
        const priorityOptions = ["", "High", "Medium", "Low"];
        for (let i = 0; i < priorityOptions.length; i++) {
            const option = document.createElement("option");
            option.value = priorityOptions[i].toLowerCase();
            option.textContent = priorityOptions[i];
            priorityInput.appendChild(option);
        }
        priorityLabel.setAttribute("for","priority");
        priorityLabel.textContent = "Priority:";
        priorityWrapper.append(priorityLabel, priorityInput);

        //Add selection of options of projects for todo items to be added
        const projectWrapper = document.createElement("p");
        const projectLabel = document.createElement("label");
        const projectInput = document.createElement("select");
        projectInput.setAttribute("id","newProject");
        projectInput.setAttribute("name","project");
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        projectInput.appendChild(defaultOption);
        for (let i = 0; i < existingProjects.length; i++) {
            const option = document.createElement("option");
            option.textContent = existingProjects[i].name;
            //set a value attribute for each option so this value can be further referenced in the createTodo function
            option.value = existingProjects[i].projectIndex;
            projectInput.appendChild(option);
        }
        projectLabel.setAttribute("for","project");
        projectLabel.textContent = "Project:";
        projectWrapper.append(projectLabel, projectInput);

        const buttonsWrapper = document.createElement("div");
        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("formBtns");
        cancelBtn.setAttribute("class","cancelBtn");
        cancelBtn.setAttribute("type","button");
        cancelBtn.textContent = "Cancel";
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("formBtns");
        submitBtn.setAttribute("type","submit");
        submitBtn.textContent = "Add Task";
        buttonsWrapper.append(cancelBtn, submitBtn);

        form.append(titleWrapper, descriptionWrapper, ddWrapper, priorityWrapper, projectWrapper, buttonsWrapper);
        dialog.appendChild(form);
    }

    function addNewProjectForm() {
        const form = document.createElement("form");
        form.classList.add("projectForm");
        form.setAttribute("method","dialog");
        
        const titleWrapper = document.createElement("p");
        const titleInput = document.createElement("input");
        titleInput.setAttribute("id","projectTitle");
        titleInput.setAttribute("name","projectTitle");
        titleInput.setAttribute("required","");
        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for","projectTitle");
        titleLabel.textContent = "Project title:";
        titleWrapper.append(titleLabel, titleInput);

        const buttonsWrapper = document.createElement("div");
        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("formBtns");
        cancelBtn.setAttribute("class","cancelBtn");
        cancelBtn.setAttribute("type","button");
        cancelBtn.textContent = "Cancel";
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("formBtns");
        submitBtn.setAttribute("type","submit");
        submitBtn.textContent = "Add Project";
        buttonsWrapper.append(cancelBtn, submitBtn);

        form.append(titleWrapper, buttonsWrapper);
        dialog.appendChild(form);
    }

    function addEditTodoForm (existingProjects, existingTodoItem) {
        const form = document.createElement("form");
        form.classList.add("editTodoForm");
        
        const titleWrapper = document.createElement("p");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input")
        titleInput.setAttribute("id","editTitle");
        titleInput.setAttribute("name","title");
        titleInput.setAttribute("required","");
        titleInput.value = existingTodoItem.title;
        titleLabel.setAttribute("for","title");
        titleLabel.textContent = "Task title:";
        titleWrapper.append(titleLabel, titleInput);

        const descriptionWrapper = document.createElement("p");
        const descriptionLabel = document.createElement("label");
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("id","editDescription");
        descriptionInput.setAttribute("name","description");
        descriptionInput.value = existingTodoItem.description;
        descriptionLabel.setAttribute("for","description");
        descriptionLabel.textContent = "Description:";
        descriptionWrapper.append(descriptionLabel, descriptionInput);

        const ddWrapper = document.createElement("p");
        const ddLabel = document.createElement("label");
        const ddInput = document.createElement("input");
        ddInput.setAttribute("id","editDd");
        ddInput.setAttribute("name","dd");
        ddInput.setAttribute("type","date");
        ddInput.value = existingTodoItem.dueDate;
        ddLabel.setAttribute("for","dd");
        ddLabel.textContent = "Due date:";
        ddWrapper.append(ddLabel, ddInput);
        
        const priorityWrapper = document.createElement("p");
        const priorityLabel = document.createElement("label");
        const priorityInput = document.createElement("select");
        priorityInput.setAttribute("id","editPriority");
        priorityInput.setAttribute("name","priority");
        const priorityOptions = ["", "High", "Medium", "Low"];
        for (let i = 0; i < priorityOptions.length; i++) {
            const option = document.createElement("option");
            option.value = priorityOptions[i].toLowerCase();
            option.textContent = priorityOptions[i];
            priorityInput.appendChild(option);
            if (existingTodoItem.priority === option.value) {
                option.setAttribute("selected","");
            }
        }
        priorityLabel.setAttribute("for","priority");
        priorityLabel.textContent = "Priority:";
        priorityWrapper.append(priorityLabel, priorityInput);

        //Add selection of options of projects for todo items to be added
        const projectWrapper = document.createElement("p");
        const projectLabel = document.createElement("label");
        const projectInput = document.createElement("select");
        projectInput.setAttribute("id","editProject");
        projectInput.setAttribute("name","project");
        const defaultOption = document.createElement("option");
        projectInput.appendChild(defaultOption);
        for (let i = 0; i < existingProjects.length; i++) {
            const option = document.createElement("option");
            option.textContent = existingProjects[i].name;
            //set a value attribute for each option so this value can be further referenced in the createTodo function
            option.value = existingProjects[i].projectIndex;
            projectInput.appendChild(option);
            if (existingTodoItem.projectIndex == option.value) {
                option.setAttribute("selected", "");
            }
        }
        projectLabel.setAttribute("for","project");
        projectLabel.textContent = "Project:";
        projectWrapper.append(projectLabel, projectInput);

        const buttonsWrapper = document.createElement("div");
        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("formBtns");
        cancelBtn.setAttribute("class","cancelBtn");
        cancelBtn.setAttribute("type","button");
        cancelBtn.textContent = "Cancel";
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("formBtns");
        submitBtn.setAttribute("type","submit");
        submitBtn.textContent = "Confirm Edit";
        buttonsWrapper.append(cancelBtn, submitBtn);

        form.append(titleWrapper, descriptionWrapper, ddWrapper, priorityWrapper, projectWrapper, buttonsWrapper);
        dialog.appendChild(form);
    }

    return {
        addNewTodoForm,
        addNewProjectForm,
        addEditTodoForm,
    }
}


function sidebarDOM() {
    const defaultProjectList = document.querySelector(".default");
    const userProjectList = document.querySelector(".projects");

    function addDefaultProjects (defaultProjects) {
        for (let i = 0; i < defaultProjects.length; i++) {
            const listItem = document.createElement("li");
            const button = document.createElement("button");
            button.classList.add("projectBtn");
            button.textContent = defaultProjects[i].name;

            listItem.appendChild(button);
            defaultProjectList.appendChild(listItem);
        }
    }

    function updateProjectList(projects) {
        
        userProjectList.textContent = "";
        
        for (let i = 0; i < projects.length; i++) {
            const listItem = document.createElement("li");
            const button = document.createElement("button");
            button.classList.add("projectBtn");
            button.textContent = projects[i].name;

            listItem.appendChild(button);
            userProjectList.appendChild(listItem);
        }
    }

    return {
        addDefaultProjects,
        updateProjectList,
    }
}