//This js file will contain a module that keeps track of the todo item info in the dashboard
import {isToday, parse} from "date-fns";

export {manipulateTodo}; 

//Create a module for creating new todo items object
//todo-items should have a title, description, dueDate and priority
function manipulateTodo () {
    const allTodoItems = [];
    //The arrays below should always be a sub-array of allTodoItems
    //They can be updated by sorting whenever there is an update on allTodoItems
    let todayTodo = [];
    let scheduledTodo = [];
    let importantTodo = [];
    let completedTodo = [];

    //Create new todo item, public method
    function createNewTodo(title, description, dueDate, priority, projectIndex) {
        const newTodo = {
            title, //string type
            description, //string
            dueDate, //date (string type)
            priority, //string type
            projectIndex,
            checklist: undefined,//boolean type: true/ false
        };
        allTodoItems.push(newTodo);
    }
    //Edit tood item, public method
    function editTodo(todoItemIndex, title, description, dueDate, priority) {
        allTodoItems[todoItemIndex] = {title, description, dueDate, priority};
    }

    function checkTodo(todoItemIndex){
        allTodoItems[todoItemIndex].checklist === true?
            allTodoItems[todoItemIndex].checklist = false: allTodoItems[todoItemIndex].checklist = true;
    }

    //Delete todo item from allTodo list, public method
    function deleteTodo(todoItemIndex) {
        allTodoItems.splice(todoItemIndex, 1);
    }

    //Update allTodoItems array when modified (when new todo item is created or deleted)
    // and then subarrays according to allTodoItems, private method
    function updateArr () {
        //assign index number for identifying each unique item
        for(let i=0; i<allTodoItems.length; i++) {
            allTodoItems[i].itemIndex = i;
        }
        todayTodo = allTodoItems.filter((todoItem) => isToday(todoItem.dueDate));
        scheduledTodo = allTodoItems.filter((todoItem) => todoItem.dueDate !== undefined);
        importantTodo = allTodoItems.filter((todoItem) => todoItem.priority === "high");
        completedTodo = allTodoItems.filter((todoItem) => todoItem.checklist === true);
    }


    //
    const getAllTodo = () => allTodoItems;
    const getTodayTodo = () => todayTodo;
    const getScheduledTodo = () => scheduledTodo;
    const getImportantTodo = () => importantTodo;
    const getCompletedTodo = () => completedTodo;

    return {
        createNewTodo,
        editTodo,
        checkTodo,
        deleteTodo,
        updateArr,
        getAllTodo,
        getTodayTodo,
        getScheduledTodo,
        getImportantTodo,
        getCompletedTodo,
    }
}

