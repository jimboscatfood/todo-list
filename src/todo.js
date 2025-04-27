//This js file will contain a module that keeps track of the todo item info in the dashboard
import {isToday, parse} from "date-fns";

export default manipulateTodo; 

//Create a module for creating new todo items object
//todo-items should have a title, description, dueDate and priority
function manipulateTodo () {
    
    let defaultProject = [
        {
            name: "All",
            todoItems:[],
            projectIndex:0,
        },
        {
            name: "Today",
            todoItems:[],
            projectIndex:1,
        },
        {
            name: "Scheduled",
            todoItems:[],
            projectIndex:2,
        },
        {
            name: "Important",
            todoItems:[],
            projectIndex:3,
        },
        {
            name: "Completed",
            todoItems:[],
            projectIndex:4,
        }
    ];
    let userProjects = [];

    //Create new todo item, public method
    function createNewTodo(title, description, dueDate, priority, projectIndex) {
        const newTodo = {
            title, //string type
            description, //string
            dueDate, //date (string type)
            priority, //string type
            projectIndex,
            checklist: undefined,//boolean type: true/ false,
        };
        defaultProject[0].todoItems.push(newTodo);
    }
    //Edit tood item, public method
    function editTodo(todoItemIndex, title, description, dueDate, priority) {
        
    }

    function checkTodo(todoItemIndex){
        defaultProject[0].todoItems[todoItemIndex].checklist === true?
            defaultProject[0].todoItems[todoItemIndex].checklist = false:
            defaultProject[0].todoItems[todoItemIndex].checklist = true;
    }

    //Delete todo item from allTodo list, public method
    function deleteTodo(todoItemIndex) {
        defaultProject[0].todoItems.splice(todoItemIndex, 1);
    }

    //Update defaultProject[0].todoItems. array when modified (when new todo item is created or deleted)
    // and then subarrays according to defaultProject[0].todoItems., private method
    function updateTodoLists () {
        //assign index number for identifying each unique item
        for(let i=0; i<defaultProject[0].todoItems.length; i++) {
            defaultProject[0].todoItems[i].itemIndex = i;
        }
        defaultProject[1].todoItems = defaultProject[0].todoItems.filter((todoItem) => isToday(todoItem.dueDate));
        defaultProject[2].todoItems = defaultProject[0].todoItems.filter((todoItem) => todoItem.dueDate !== undefined);
        defaultProject[3].todoItems = defaultProject[0].todoItems.filter((todoItem) => todoItem.priority === "high");
        defaultProject[4].todoItems = defaultProject[0].todoItems.filter((todoItem) => todoItem.checklist === true);
        
        userProjects = [];
        //FOR each item in the all todo item list
        for (let j = 0; j < defaultProject[0].todoItems.length; j++) {
            //IF it has a project index
            if (defaultProject[0].todoItems[j].projectIndex !== "") {
                //AND IF there is no array already defined at the index of projectIndex
                if (userProjects[defaultProject[0].todoItems[j].projectIndex] === undefined){
                    //THEN create an empty array and add it into the userProjects array at the index of projectIndex
                    const subArr = [];
                    subArr.push(defaultProject[0].todoItems[j]);
                    userProjects.splice(defaultProject[0].todoItems[j].projectIndex,0,subArr);
                }
                //ELSE just add it to the array inside of the userProjects array
                else {
                    userProjects[defaultProject[0].todoItems[j].projectIndex].push(defaultProject[0].todoItems[j]);
                }
            }
        }
    }
    
    const getDefaultProject = () => defaultProject;

    const getUserProject = () => userProjects;

    

    return {
        createNewTodo,
        editTodo,
        checkTodo,
        deleteTodo,
        updateTodoLists,
        getDefaultProject,
        getUserProject,
    }
}

