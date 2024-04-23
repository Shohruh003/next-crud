import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  modalState: false,
  deleteModalState: false,
};

let name = "common";

export const {
  reducer: commonReducers,
  actions: { toggleModal,toggleDeleteModal },
} = createSlice({
  initialState,
  name,
  reducers: {
    toggleModal(state, action) {
      state.modalState = action.payload;
    },
    toggleDeleteModal(state, action) {
      state.deleteModalState = action.payload;
    },
  },
});

//boldi shas