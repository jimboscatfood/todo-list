//This js file will contain a module that keeps track of the todo item info in the dashboard
import {isToday} from "date-fns";

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
            checklist: false,//boolean type: true/ false,
        };
        defaultProject[0].todoItems.push(newTodo);
    }
    //Edit tood item, public method
    function editTodo(todoItemIndex, editedTitle, editedDescription, editedDueDate, editedPriority, editedProjectIndex, existingProjects) {
        defaultProject[0].todoItems[todoItemIndex].title = editedTitle;
        defaultProject[0].todoItems[todoItemIndex].description = editedDescription;
        defaultProject[0].todoItems[todoItemIndex].dueDate = editedDueDate;
        defaultProject[0].todoItems[todoItemIndex].priority = editedPriority;
        defaultProject[0].todoItems[todoItemIndex].projectIndex = editedProjectIndex;
    }

    function checkTodo(todoItemIndex){
        defaultProject[0].todoItems[todoItemIndex].checklist === true?
            defaultProject[0].todoItems[todoItemIndex].checklist = false:
            defaultProject[0].todoItems[todoItemIndex].checklist = true;

    }

    //Delete todo item from allTodo list
    function deleteTodo(todoItemIndex) {
        defaultProject[0].todoItems.splice(todoItemIndex, 1);

    }

    //Update defaultProject[0].todoItems. array when modified (when new todo item is created or deleted)
    // and then subarrays according to defaultProject[0].todoItems., private method
    function updateTodoLists (existingProjects) {
        //assign index number for identifying each unique item
        for(let i=0; i < defaultProject[0].todoItems.length; i++) {
            defaultProject[0].todoItems[i].itemIndex = i;
        }
        defaultProject[1].todoItems = defaultProject[0].todoItems.filter((todoItem) => isToday(todoItem.dueDate));
        defaultProject[2].todoItems = defaultProject[0].todoItems.filter((todoItem) => todoItem.dueDate !== "");
        defaultProject[3].todoItems = defaultProject[0].todoItems.filter((todoItem) => todoItem.priority === "high");
        defaultProject[4].todoItems = defaultProject[0].todoItems.filter((todoItem) => todoItem.checklist === true);
        
        userProjects = [];
        for (let j = 0; j < existingProjects.length; j++) {
            const projectTodoArr = [];
            userProjects.push(projectTodoArr);
        }
        //FOR each item in the all todo item list
        for (let k = 0; k < defaultProject[0].todoItems.length; k++) {
            //IF it has a project index and the number of user-defined project is not zero
            if (defaultProject[0].todoItems[k].projectIndex !== "" && existingProjects.length > 0) {
                //THEN add it into the userProjects array at the index of projectIndex
                userProjects.at(defaultProject[0].todoItems[k].projectIndex).push(defaultProject[0].todoItems[k]);
            }
        }   
    }
    
    function updateTodoProjectIndex (activeProject) {
        for (let i = 0; i < defaultProject[0].todoItems.length; i++) {
            //IF the todo item projectIndex property is larger or equal to activeProject when it is being deleted
            if (defaultProject[0].todoItems[i].projectIndex >= activeProject.projectIndex) {
                //THEN take 1 off the projectIndex
                defaultProject[0].todoItems[i].projectIndex -= 1;
            }
        }
    }

    
    const getDefaultProject = () => defaultProject;

    const getUserProject = () => userProjects;

    const getAllTodoItems = () => defaultProject[0].todoItems;

    const setAllTodoItems = (storageAllTodos) => {
        defaultProject[0].todoItems = storageAllTodos;
    };

    return {
        createNewTodo,
        editTodo,
        checkTodo,
        deleteTodo,
        updateTodoLists,
        getDefaultProject,
        getUserProject,
        updateTodoProjectIndex,
        setAllTodoItems,
        getAllTodoItems,
    }
}

