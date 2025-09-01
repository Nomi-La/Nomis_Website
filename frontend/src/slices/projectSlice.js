import generalSlice from "../utils/generalSlice.js";
import {createModel, deleteModel, editModel, fetchModel, fetchModels} from "../utils/asyncThunk.js";

export const fetchProject = fetchModel('project', 'projects/')
export const fetchProjects = fetchModels('project', 'projects/')
export const postProject = createModel('project', 'projects/')
export const editProject = editModel('project', 'projects/')
export const deleteProject = deleteModel('project', 'projects/')

const projectSlice = generalSlice('projects',
    fetchProjects, fetchProject, postProject, editProject, deleteProject)

export default projectSlice.reducer