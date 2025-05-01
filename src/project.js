export default manipulateProjects;

function manipulateProjects() {
    const projects = [];

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

    function updateProjectIndex () {
        projects.forEach((project, index) => {
            project.projectIndex = index;
        });
    }

    const getProjectList = () => projects;
    

    return {
        createProject,
        updateProjectIndex,
        getProjectList,
        deleteProject,
    }
}