import {isToday, parse} from "date-fns";

export {manipulateTodo}; 

//Create a module for creating new todo items object
//todo-items should have a title, description, dueDate and priority, notes
const manipulateTodo = (function(){
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
        
        updateSubArr();
    }
    //Edit tood item, public method
    function editTodo(todoItemIndex, title, description, dueDate, priority, notes, checklist) {
        allTodoItems[todoItemIndex] = {title, description, dueDate, priority, notes, checklist};

        updateSubArr();
    }

    //Delete todo item, public method
    function deleteTodo(todoItemIndex) {
        allTodoItems.splice(todoItemIndex, 1);

        updateSubArr();
    }

    //Update subarrays according to allTodoItems, private method
    function updateSubArr () {
        todayTodo = allTodoItems.filter((todoItem) => isToday(todoItem.dueDate));
        scheduledTodo = allTodoItems.filter((todoItem) => todoItem.dueDate !== undefined);
        importantTodo = allTodoItems.filter((todoItem) => todoItem.priority === "High");
        completedTodo = allTodoItems.filter((todoItem) => todoItem.checklist === true);
    }

    function getList() {
        return allTodoItems;
    }

    return {
        createNewTodo,
        editTodo,
        deleteTodo,
        getList,
    }

})();


//Create a module for adding DOM to the page
const manipulateDOM = (function() {


})();