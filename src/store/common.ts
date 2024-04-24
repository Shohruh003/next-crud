import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  modalState: false,
  deleteModalState: false,
  editModalState: false,
};

let name = "common";

export const {
  reducer: commonReducers,
  actions: { toggleModal, toggleDeleteModal, toggleEditModal },
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
    toggleEditModal(state, action) {
      state.editModalState = action.payload;
    },
  },
});
