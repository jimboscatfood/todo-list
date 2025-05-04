export default storage;


function storage() {

    function setStorage(allTodoItems, projects, activeProject) {
        //allTodoItems as array
        localStorage.setItem("allTodoItems",JSON.stringify(allTodoItems));
        //projects as array
        localStorage.setItem("projects", JSON.stringify(projects));
        //activeProject as object
        localStorage.setItem("activeProject", JSON.stringify(activeProject));
    }

    function getStorage() {
        const allTodoItems = JSON.parse(localStorage.getItem("allTodoItems"));
        const projects = JSON.parse(localStorage.getItem("projects"));
        const activeProject = JSON.parse(localStorage.getItem("activeProject"));

        return [allTodoItems, projects, activeProject];
    }


    return {
        setStorage,
        getStorage
    }
}