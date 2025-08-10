import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const fetchPublicCookbooks = createAsyncThunk(
  "cookbooks/fetchPublic",
  async () => {
    const response = await api.get("cookbooks/?limit=100&offset=0");
    return response.data;
  }
);

export const createCookbook = createAsyncThunk(
  "cookbooks/create",
  async (cookbookData, { rejectWithValue }) => {
    try {
      const response = await api.post("cookbooks/create/", cookbookData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cookbookSlice = createSlice({
  name: "cookbooks",
  initialState: {
    items: [],
    fetchStatus: "idle",
    fetchError: null,
    createStatus: "idle",
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    /* GET /cookbooks/ */
    builder
      .addCase(fetchPublicCookbooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPublicCookbooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.results;
      })
      .addCase(fetchPublicCookbooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    /* POST /cookbooks/create/ */
    builder
      .addCase(createCookbook.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createCookbook.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createCookbook.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      });
  },
});

export default cookbookSlice.reducer;
