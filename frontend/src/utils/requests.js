import api from "./api.js";

const filterModels = (endPoint) => {
    return async (paramData) => {
        const {data} = await api.get(endPoint, {params: paramData});

        return Array.isArray(data) ? data : (data.results ?? []);
    }
}

export const filterSections = filterModels('sections/')
export const filterProjects = filterModels('projects/')
export const filterLinks = filterModels('projects/links/')
export const filterCategories = filterModels('categories/')

