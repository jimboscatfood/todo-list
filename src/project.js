import storage from "./storage";

export default manipulateProjects;

function manipulateProjects() {
    let projects = [];

    function createProject(projectName) {
        const newProject = {
            name: projectName,
            projectIndex: (projects.length),
        }

        projects.push(newProject);
    }

    function deleteProject (projectIndex) {
        projects.splice(projectIndex,1);
    }

    const getProjectList = () => projects;

    const setProjectList = (storageProjects) => {
        projects = storageProjects;
    }
    

    return {
        createProject,
        getProjectList,
        deleteProject,
        setProjectList,
    }
}