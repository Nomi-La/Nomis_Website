import generalSlice from "../utils/generalSlice.js";
import {createModel, deleteModel, editModel, fetchModel, fetchModels, modelDown, modelUp} from "../utils/asyncThunk.js";

export const fetchSection = fetchModel('sections', 'sections/')
export const fetchSections = fetchModels('sections', 'sections/')
export const postSection = createModel('sections', 'sections/')
export const editSection = editModel('sections', 'sections/')
export const deleteSection = deleteModel('sections', 'sections/')
export const sectionUp = modelUp('sections', 'sections/')
export const sectionDown = modelDown('sections', 'sections/')


const sectionSlice = generalSlice('sections',
    fetchSections, fetchSection, postSection, editSection, deleteSection, sectionUp, sectionDown)

export default sectionSlice.reducer