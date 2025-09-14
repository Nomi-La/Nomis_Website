import {createSlice} from "@reduxjs/toolkit";

function changeState(value){
    return (state, action = undefined) => {
        state[value] = action.payload === 'open'? true: action.payload === 'close'? false: !state[value]
    }
}

const stateSlice = createSlice({
    name: 'global-state',
    initialState: {
        sideBar: false,
        loggedIn: false
    },
    reducers: {
        sideBarState: changeState('sideBar'),
        loggedInState: changeState('loggedIn')
    }
});

export const {sideBarState, loggedInState} = stateSlice.actions;
export default stateSlice.reducer;