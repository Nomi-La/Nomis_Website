import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const fetchPublicRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async () => {
    const res = await api.get("recipes/");
    return res.data;
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/create",
  async (recipeData, { rejectWithValue }) => {
    try {
      const response = await api.post("recipes/create/", recipeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    fetchStatus: "idle",
    fetchError: null,
    createStatus: "idle",
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
    /* GET /recipes/ */
    builder
      .addCase(fetchPublicRecipes.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchPublicRecipes.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload.results;
      })
      .addCase(fetchPublicRecipes.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.error.message;
      });

    /* POST /recipes/create/ */
    builder
      .addCase(createRecipe.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      });
  },
});

export default recipeSlice.reducer;
