import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../axios/api.js";
import parseError from "./parseError.js";

export const fetchModels = (modelName, endPoint) => {

    return createAsyncThunk(
        `${modelName}/fetchAll`,
        async (paramData, {rejectWithValue}) => {
            try {
                const response = await api.get(endPoint, {params: paramData})
                return response.data
            } catch (err) {
                return rejectWithValue(parseError(err));
            }
        }
    )
}

export const createModel = (modelName, endPoint) => {
    return createAsyncThunk(
        `${modelName}/create`,
        async (modelData, {rejectWithValue}) => {
            try {
                const response = await api.post(endPoint, modelData);
                return response.data
            } catch (err) {
                return rejectWithValue(parseError(err));
            }
        }
    )
}

export const deleteModel = (modelName, endPoint) => {
    return createAsyncThunk(
        `${modelName}/delete`,
        async (id, {rejectWithValue}) => {
            try {
                await api.delete(`${endPoint}${id}/`);
                return id;
            } catch (err) {
                return rejectWithValue(parseError(err));
            }
        }
    )
}

export const fetchModel = (modelName, endPoint) => {
    return createAsyncThunk(
        `${modelName}/fetchById`,
        async (id, {rejectWithValue}) => {
            try {
                const response = await api.get(`${endPoint}${id}/`);
                return response.data
            } catch (err) {
                return rejectWithValue(parseError(err));
            }
        }
    )
}

export const editModel = (modelName, endPoint) => {
    return createAsyncThunk(
        `${modelName}/edit`,
        async ({modelData, id}, {rejectWithValue}) => {
            try {
                const response = await api.patch(`${endPoint}${id}/`, modelData);
                return response.data
            } catch (err) {
                return rejectWithValue(parseError(err));
            }
        }
    )
}

