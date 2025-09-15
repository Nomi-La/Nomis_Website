import generalSlice from "../utils/generalSlice.js";
import {createModel, deleteModel, editModel, fetchModel, fetchModels, modelDown, modelUp} from "../utils/asyncThunk.js";

export const fetchProject = fetchModel('projects', 'projects/')
export const fetchProjects = fetchModels('projects', 'projects/')
export const postProject = createModel('projects', 'projects/')
export const editProject = editModel('projects', 'projects/')
export const deleteProject = deleteModel('projects', 'projects/')
export const projectUp = modelUp('projects', 'projects/')
export const projectDown = modelDown('projects', 'projects/')


const projectSlice = generalSlice('projects',
    fetchProjects, fetchProject, postProject, editProject, deleteProject, projectUp, projectDown)

export default projectSlice.reducer