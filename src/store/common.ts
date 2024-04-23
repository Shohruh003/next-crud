import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    modalState: false
}

let name = 'common'

export const { reducer: commonReducers, actions: commonActions } = createSlice({
    initialState,
    name,
    reducers: {
        toggleModal(state, action) {
            state.modalState = action.payload
        }
    }
})