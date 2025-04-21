//This js file will contain a module that keeps track of the todo item info in the dashboard
import {isToday, parse} from "date-fns";

export {manipulateTodo}; 

//Create a module for creating new todo items object
//todo-items should have a title, description, dueDate and priority
function manipulateTodo () {
    const allTodoItems = [];
    //The arrays below should always be a sub-array of allTodoItems
    //They can be updated by sorting whenever there is an update on allTodoItems
    //these arrays belong to the "default" project
    let todayTodo = [];
    let scheduledTodo = [];
    let importantTodo = [];
    let completedTodo = [];
    //this array belong to the project with projectIndex assigned
    let projectsTodo = [];

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
        
        projectsTodo = [];
        //FOR each item in the all todo item list
        for (let j = 0; j < allTodoItems.length; j++) {
            //IF it has a project index
            if (allTodoItems[j].projectIndex !== "") {
                //AND IF there is no array already defined at the index of projectIndex
                if (projectsTodo[allTodoItems[j].projectIndex] === undefined){
                    //THEN create an empty array and add it into the projectsTodo array at the index of projectIndex
                    const subArr = [];
                    subArr.push(allTodoItems[j]);
                    projectsTodo.splice(allTodoItems[j].projectIndex,0,subArr);
                }
                //ELSE just add it to the array inside of the projectsTodo array
                else {
                    projectsTodo[allTodoItems[j].projectIndex].push(allTodoItems[j]);
                }
            }
        }
    }


    //
    const getAllTodo = () => allTodoItems;
    const getTodayTodo = () => todayTodo;
    const getScheduledTodo = () => scheduledTodo;
    const getImportantTodo = () => importantTodo;
    const getCompletedTodo = () => completedTodo;
    const getProjectsTodo = () => projectsTodo;

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
        getProjectsTodo,
    }
}

