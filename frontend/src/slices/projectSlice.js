import generalSlice from "../utils/generalSlice.js";
import {createModel, deleteModel, editModel, fetchModel, fetchModels} from "../utils/asyncThunk.js";

export const fetchProject = fetchModel('projects', 'projects/')
export const fetchProjects = fetchModels('projects', 'projects/')
export const postProject = createModel('projects', 'projects/')
export const editProject = editModel('projects', 'projects/')
export const deleteProject = deleteModel('projects', 'projects/')



const projectSlice = generalSlice('projects',
    fetchProjects, fetchProject, postProject, editProject, deleteProject)

export default projectSlice.reducer