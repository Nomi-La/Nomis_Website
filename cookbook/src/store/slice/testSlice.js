import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: 'Hello from Redux!'
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    }
  }
})

export const { setMessage } = testSlice.actions
export default testSlice.reducer