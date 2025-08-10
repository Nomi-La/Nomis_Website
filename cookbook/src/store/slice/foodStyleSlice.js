import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const fetchFoodStyles = createAsyncThunk(
  "foodStyle/fetchAll",
  async () => {
    const res = await api.get("category/food-styles/");
    return res.data
  }
);

const foodStyleSlice = createSlice({
  name: "foodStyle",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodStyles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoodStyles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.results;
      })
      .addCase(fetchFoodStyles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default foodStyleSlice.reducer;
