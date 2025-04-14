//This js file will contain a module that keeps track of the todo item info in the dashboard
import {isToday, parse} from "date-fns";

export {manipulateTodo, manipulateDOM}; 

//Create a module for creating new todo items object
//todo-items should have a title, description, dueDate and priority, notes
function manipulateTodo () {
    let allTodoItems = [];
    //The arrays below should always be a sub-array of allTodoItems
    //They can be updated by sorting whenever there is an update on allTodoItems
    let todayTodo = [];
    let scheduledTodo = [];
    let importantTodo = [];
    let completedTodo = [];

    //Create new todo item, public method
    function createNewTodo(title, description, dueDateInput, priority, notes, checklist) {
        const newTodo = {
            title, //string type
            description, //string
            dueDate: parse(dueDateInput,'yyyy-LL-d', new Date()), //date (string type)
            priority, //string type
            notes, //string type
            checklist //boolean type: true/ false
        };
        allTodoItems.push(newTodo);
    }
    //Edit tood item, public method
    function editTodo(todoItemIndex, title, description, dueDate, priority, notes) {
        allTodoItems[todoItemIndex] = {title, description, dueDate, priority, notes};
    }

    function checkTodo(todoItemIndex){
        allTodoItems[todoItemIndex].checklist === true?
            allTodoItems[todoItemIndex].checklist = false: allTodoItems[todoItemIndex].checklist = true;
    }

    //Delete todo item, public method
    function deleteTodo(todoItemIndex) {
        allTodoItems.splice(todoItemIndex, 1);
    }

    //Update subarrays according to allTodoItems, private method
    function updateSubArr () {
        todayTodo = allTodoItems.filter((todoItem) => isToday(todoItem.dueDate));
        scheduledTodo = allTodoItems.filter((todoItem) => todoItem.dueDate !== undefined);
        importantTodo = allTodoItems.filter((todoItem) => todoItem.priority === "High");
        completedTodo = allTodoItems.filter((todoItem) => todoItem.checklist === true);
    }

    return {
        createNewTodo,
        editTodo,
        checkTodo,
        deleteTodo,
    }
}


//Create a module for adding DOM to the page
function manipulateDOM() {
    const todosContent = document.querySelector("div#todos"); 
    function displayTodos(listArr) {
        //Clear page first
        todosContent.textContent = "";
        listArr.forEach((todoItem) => {
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

