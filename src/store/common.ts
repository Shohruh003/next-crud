import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  modalState: false,
  deleteModalState: false,
  editModalState: false,
  userId: null,
  users: [],
};

let name = "common";

export const {
  reducer: commonReducers,
  actions: {
    toggleModal,
    toggleDeleteModal,
    toggleEditModal,
    toggleUserId,
    toggleUsers,
  },
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
    toggleUserId(state, action) {
      state.userId = action.payload;
    },
    toggleUsers(state, action) {
      state.users = action.payload;
    },
  },
});
