import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { RootState } from "../store";
import { nanoid } from "nanoid";

const queueAdapter = createEntityAdapter<User>({
  selectId: (book) => book.email,
  // sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const Users = createSlice({
  name: "Users",
  initialState: queueAdapter.getInitialState({
    ids: [],
    entities: {},
    active: null,
  }),
  reducers: {
    setActiveUser(state, action) {
      state.active = action.payload;
    },
    unSetActiveUser(state, action) {
      state.active = null;
    },
    addUser(state, action) {
      // action.payload.id = nanoid();
      // action.payload.date = new Date().toISOString();
      queueAdapter.addOne(state, action);
    },
    addUsers(state, action) {
      action.payload = action.payload.map((User: User) => {
        // User.date = new Date().toISOString();
        // User.id = nanoid();
        return User;
      });
      queueAdapter.addMany(state, action);
    },
    UserUpdate: queueAdapter.updateOne,
    removeUser: queueAdapter.removeOne,
    clearUsers: queueAdapter.removeAll,

    UserSetAll(state, action) {
      queueAdapter.setAll(state, action.payload);
    },
  },
});

export const UserSelector = queueAdapter.getSelectors<RootState>(
  (state) => state.user
);

export const {
  addUser,
  addUsers,
  removeUser,
  UserUpdate,
  UserSetAll,
  clearUsers,
  setActiveUser,
  unSetActiveUser,
} = Users.actions;

export default Users.reducer;
