import {createSlice} from "@reduxjs/toolkit";

function changeState(value){
    return (state) => {
        state[value] = !state[value]
    }
}

const stateSlice = createSlice({
    name: 'global-state',
    initialState: {
        sideBar: true,
        loggedIn: false
    },
    reducers: {
        sideBarState: changeState('sideBar'),
        loggedInState: changeState('loggedIn')
    }
});

export const {sideBarState, loggedInState} = stateSlice.actions;
export default stateSlice.reducer;