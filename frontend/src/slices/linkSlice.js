import generalSlice from "../utils/generalSlice.js";
import {createModel, deleteModel, editModel, fetchModel, fetchModels} from "../utils/asyncThunk.js";

export const fetchLinks = fetchModels('links', 'projects/links/')
export const fetchLink = fetchModel('links', 'projects/links/')
export const postLink = createModel('links', 'projects/links/')
export const editLink = editModel('links', 'projects/links/')
export const deleteLink = deleteModel('links', 'projects/links/')

const linkSlice = generalSlice('links',
    fetchLinks, fetchLink, postLink, editLink, deleteLink)

export default linkSlice.reducer