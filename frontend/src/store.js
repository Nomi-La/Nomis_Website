import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import sectionReducer from "./slices/sectionSlice.js";
import projectReducer from "./slices/projectSlice.js";
import linkReducer from "./slices/linkSlice.js";
import stateReducer from "./slices/stateSlice.js";

const store = configureStore({
    reducer:{
        auth: authReducer,
        categories: categoryReducer,
        sections: sectionReducer,
        projects: projectReducer,
        links: linkReducer,
        global: stateReducer,
    },
});

export default store