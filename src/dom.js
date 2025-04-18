//Create a module for adding DOM to the page

export {dashboardDOM, formDOM, sidebarDOM};

function dashboardDOM() {
    const todosContent = document.querySelector("div#todos");

    function displayTodos(todoArr) {
        //Clear page first
        todosContent.textContent = "";
        todoArr.forEach((todoItem) => {
            const itemBox = document.createElement("div");
            itemBox.classList.add("itemBox");
            todosContent.appendChild(itemBox);

            const checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            todoItem.checklist === true? checkbox.checked = true: checkbox.checked = false;

            const todoTitle = document.createElement("h3");
            todoTitle.textContent = todoItem.title;

            const todoDueDate = document.createElement("p");
            todoDueDate.textContent = todoItem.dueDate;

            const editButton = document.createElement("button");
            editButton.appendChild(document.createElement("img"));

            const deleteButton = document.createElement("button");
            deleteButton.appendChild(document.createElement("img"));

            itemBox.append(checkbox, todoTitle, todoDueDate, editButton, deleteButton);
        })
    }

        return {
            displayTodos,
        }
};

const ui = document.querySelector("div#ui");

function formDOM() {
    //this function add the dialog form to the DOM tree, should only be run once when the webpage first renders
    function addFormDOM() {
        const dialog = document.createElement("dialog");
        dialog.setAttribute("id","newTodo");

        const form = document.createElement("form");
        form.classList.add("todoForm");
        form.setAttribute("method","dialog");
        
        const titleWrapper = document.createElement("p");
        const titleLabel = document.createElement("label");
        const titleInput = document.createElement("input")
        titleInput.setAttribute("id","title");
        titleInput.setAttribute("name","title");
        titleInput.setAttribute("required","");
        titleLabel.setAttribute("for","title");
        titleLabel.textContent = "Task title:";
        titleWrapper.append(titleLabel, titleInput);

        const descriptionWrapper = document.createElement("p");
        const descriptionLabel = document.createElement("label");
        const descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("id","description");
        descriptionInput.setAttribute("name","description");
        descriptionLabel.setAttribute("for","description");
        descriptionLabel.textContent = "Description:";
        descriptionWrapper.append(descriptionLabel, descriptionInput);

        const ddWrapper = document.createElement("p");
        const ddLabel = document.createElement("label");
        const ddInput = document.createElement("input");
        ddInput.setAttribute("id","dd");
        ddInput.setAttribute("name","dd");
        ddInput.setAttribute("type","date");
        ddLabel.setAttribute("for","dd");
        ddLabel.textContent = "Due date:";
        ddWrapper.append(ddLabel, ddInput);
        
        const priorityWrapper = document.createElement("p");
        const priorityLabel = document.createElement("label");
        const priorityInput = document.createElement("select");
        priorityInput.setAttribute("id","priority");
        priorityInput.setAttribute("name","priority");
        const priorityOptions = ["", "High", "Medium", "Low"];
        for (let i = 0; i < priorityOptions.length; i++) {
            const option = document.createElement("option");
            option.value = priorityOptions[i].toLowerCase;
            option.textContent = priorityOptions[i];
            priorityInput.appendChild(option);
        }
        priorityLabel.setAttribute("for","priority");
        priorityLabel.textContent = "Priority:";
        priorityWrapper.append(priorityLabel, priorityInput);

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

        form.append(titleWrapper, descriptionWrapper, ddWrapper, priorityWrapper, buttonsWrapper);
        dialog.appendChild(form);
        ui.appendChild(dialog);
    }

    return {
        addFormDOM,
    }
}


function sidebarDOM() {
    const projectList = document.querySelector(".projects");

    function addProjectFormDOM() {
        const dialog = document.createElement("dialog");
        dialog.setAttribute("id","newProject");

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
        ui.appendChild(dialog);
    }

    function updateProjectList(projects) {
        const projectList = document.querySelector("ul.projects");

        projectList.textContent = "";
        
        for (let i = 0; i < projects.length; i++) {
            const listItem = document.createElement("li");
            const button = document.createElement("button");
            button.textContent = projects[i].name;

            listItem.appendChild(button);
            projectList.appendChild(listItem);
        }
    }

    return {
        addProjectFormDOM,
        updateProjectList,
    }
}