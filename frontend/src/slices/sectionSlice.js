import generalSlice from "../utils/generalSlice.js";
import {createModel, deleteModel, editModel, fetchModel, fetchModels} from "../utils/asyncThunk.js";

export const fetchSection = fetchModel('sections', 'sections/')
export const fetchSections = fetchModels('sections', 'sections/')
export const postSection = createModel('sections', 'sections/')
export const editSection = editModel('sections', 'sections/')
export const deleteSection = deleteModel('sections', 'sections/')

const sectionSlice = generalSlice('sections',
    fetchSections, fetchSection, postSection, editSection, deleteSection)

export default sectionSlice.reducer