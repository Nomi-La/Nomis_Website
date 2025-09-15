import {createModel, deleteModel, editModel, fetchModel, fetchModels, modelDown, modelUp} from "../utils/asyncThunk.js";
import generalSlice from "../utils/generalSlice.js";

export const fetchCategories = fetchModels('categories', 'categories/')
export const fetchCategory = fetchModel('categories', 'categories/')
export const postCategory = createModel('categories', 'categories/')
export const editCategory = editModel('categories', 'categories/')
export const deleteCategory = deleteModel('categories', 'categories/')
export const categoryUp = modelUp('categories', 'categories/')
export const categoryDown = modelDown('categories', 'categories/')



const categorySlice = generalSlice('categories',
    fetchCategories, fetchCategory, postCategory, editCategory, deleteCategory, categoryUp, categoryDown)


export default categorySlice.reducer;