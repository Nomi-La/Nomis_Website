import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => {
    const res = await api.get("ingredients/?limit=50");
    return res.data;
  }
);

export const createIngredient = createAsyncThunk(
  "ingredients/create",
  async (ingredientData, { rejectWithValue }) => {
    try {
      const res = await api.post("ingredients/", ingredientData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.results;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
