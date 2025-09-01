import {createSlice} from "@reduxjs/toolkit";

export default function generalSlice (sliceName, get, getId, post, patch, del){
    return createSlice ({
        name: sliceName,
        initialState: {
            //get
            items: [],
            fetchStatus: 'idle',
            fetchError: null,
            //getId
            item: null,
            fetchIdStatus: 'idle',
            fetchIdError: null,
            //post
            created: null,
            createStatus: 'idle',
            createError: null,
            //edit
            edited: null,
            editStatus: 'idle',
            editError: null,
            //delete
            deleteStatus: 'idle',
            deleteError: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            //get
            builder
                .addCase(get.pending, (state) => {
                    state.fetchStatus = 'loading'
                })
                .addCase(get.fulfilled, (state, action) => {
                    state.fetchStatus = 'succeeded';
                    state.items = action.payload.results;
                })
                .addCase(get.rejected, (state, action) => {
                    state.fetchStatus = 'failed';
                    state.fetchError = action.payload ?? action.error?.message ?? 'Failed'
                })
            //getId
            builder
                .addCase(getId.pending, (state) => {
                    state.fetchIdStatus = 'loading'
                })
                .addCase(getId.fulfilled, (state, action) => {
                    state.fetchIdStatus = 'succeeded';
                    state.item = action.payload;
                })
                .addCase(getId.rejected, (state, action) => {
                    state.fetchIdStatus = 'failed';
                    state.fetchIdError = action.payload ?? action.error?.message ?? 'Failed'
                })
            //post
            builder
                .addCase(post.pending, (state) => {
                    state.createStatus = 'loading'
                })
                .addCase(post.fulfilled, (state, action) => {
                    state.createStatus = 'succeeded';
                    state.created = action.payload;
                    if (state.created && Array.isArray(state.items)) {
                           state.items.unshift(state.created);
                         }
                })
                .addCase(post.rejected, (state, action) => {
                    state.createStatus = 'failed';
                    state.createError = action.payload ?? action.error?.message ?? 'Failed'
                })
            //patch
            builder
                .addCase(patch.pending, (state) => {
                    state.editStatus = 'loading'
                })
                .addCase(patch.fulfilled, (state, action) => {
                    state.editStatus = 'succeeded';
                    state.edited = action.payload;

                     if (state.edited && Array.isArray(state.items)) {
                       const i = state.items.findIndex(x => x.id === state.edited.id);
                       if (i !== -1) state.items[i] = state.edited;
                     }
                     if (state.item && state.edited && state.item.id === state.edited.id) {
                       state.item = state.edited;
                     }

                })
                .addCase(patch.rejected, (state, action) => {
                    state.editStatus = 'failed';
                    state.editError = action.payload ?? action.error?.message ?? 'Failed'
                })
            //delete
            builder
                .addCase(del.pending, (state) => {
                    state.deleteStatus = 'loading'
                })
                .addCase(del.fulfilled, (state, action) => {
                    state.deleteStatus = 'succeeded';
                    const removedId = action.payload;
                    if (Array.isArray(state.items)) {
                      state.items = state.items.filter(x => x.id !== removedId);
                    }
                    if (state.item && state.item.id === removedId) state.item = null;
                })
                .addCase(del.rejected, (state, action) => {
                    state.deleteStatus = 'failed';
                    state.deleteError = action.payload ?? action.error?.message ?? 'Failed'
                })
        }
    })
}