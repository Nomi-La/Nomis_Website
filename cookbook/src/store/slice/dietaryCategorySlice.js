import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const fetchDietaryCategories = createAsyncThunk(
  "dietaryCategory/fetchAll",
  async () => {
    const res = await api.get("category/dietary-categories/");
    return res.data
  }
);

const dietaryCategorySlice = createSlice({
  name: "dietaryCategory",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDietaryCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDietaryCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.results;
      })
      .addCase(fetchDietaryCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dietaryCategorySlice.reducer;
