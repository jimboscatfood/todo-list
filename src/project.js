export {manipulateProjects};

function manipulateProjects() {
    const projects = [];

    function createProject(projectName) {
        const newProject = {
            name: projectName,
            todo:[],
            projectIndex: (projects.length),
        }

        projects.push(newProject);
    }

    function deleteProject () {}

    function updateProjectIndex () {
        projects.forEach((project, index) => {
            project.projectIndex = index;
        });
    }

    function addTodoToProject (allTodoArr) {

    }

    const getProjectList = () => projects;
    

    return {
        createProject,
        updateProjectIndex,
        getProjectList,
    }
}