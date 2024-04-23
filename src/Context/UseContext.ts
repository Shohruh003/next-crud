
import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    search: '',
    genders: [],
    users: [],
    month: '',
    inDate: '',
    changeRows: '',
    userIds: '',
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'rus',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setGenders: (state, action) => {
      state.genders = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setInDate: (state, action) => {
      state.inDate = action.payload;
    },
    setChangeRows: (state, action) => {
      state.changeRows = action.payload;
    },
    setUserIds: (state, action) => {
      state.userIds = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setSearch, setGenders, setUsers, setMonth, setInDate, setChangeRows, setUserIds, setLanguage } = actions;

export default configureStore({
  reducer: {
    user: reducer,
  },
});