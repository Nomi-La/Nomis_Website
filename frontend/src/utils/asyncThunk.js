import {createAsyncThunk} from "@reduxjs/toolkit";
import parseError from "./parseError.js";
import api from "./api.js";
import {sortApiAscending} from "./aids.js";

//get
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
//post
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
//delete
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
//getId
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
//patch
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
//model up
export const modelUp = (modelName, endPoint) => {
    return createAsyncThunk(
  `${modelName}/moveUp`,
      async ({ id, sectionId }, { getState, rejectWithValue }) => {
            try {
              const items = (getState()[modelName]?.items || [])
                .filter(p => p.section === sectionId)
                .sort(sortApiAscending);

              const i = items.findIndex(x => x.id === id);
              if (i <= 0) return { updates: [] };

              const a = items[i];
              const b = items[i - 1];

              await api.patch(`${endPoint}${a.id}/`, { position: b.position });
              await api.patch(`${endPoint}${b.id}/`, { position: a.position });

              return { updates: [{ id: a.id, position: b.position }, { id: b.id, position: a.position }] };
            } catch (err) {
              return rejectWithValue(parseError(err));
            }
          }
        );
}
//model down
export const modelDown = (modelName, endPoint) => {
    return createAsyncThunk(
  `${modelName}/moveDown`,
      async ({ id, sectionId }, { getState, rejectWithValue }) => {
            try {
              const items = (getState()[modelName]?.items || [])
                .filter(p => p.section === sectionId)
                .sort(sortApiAscending);

              const i = items.findIndex(x => x.id === id);
              if (i === -1 || i >= items.length - 1) return { updates: [] };

              const a = items[i];
              const b = items[i + 1];

              await api.patch(`${endPoint}${a.id}/`, { position: b.position });
              await api.patch(`${endPoint}${b.id}/`, { position: a.position });

              return { updates: [{ id: a.id, position: b.position }, { id: b.id, position: a.position }] };
            } catch (err) {
              return rejectWithValue(parseError(err));
            }
          }
        );
}