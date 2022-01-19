import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types";
import { RootState } from "../store";

const queueAdapter = createEntityAdapter<Message>({
  selectId: (book) => book.localKey,
  // @ts-ignore
  // sortComparer: (a, b) => a.localDate.localeCompare(b.localDate),
});

const Messages = createSlice({
  name: "Messages",
  initialState: queueAdapter.getInitialState(),
  reducers: {
    addMessage(state, action) {
      // action.payload.date = new Date().toISOString();
      queueAdapter.addOne(state, action);
    },
    addMessages: queueAdapter.addMany,
    MessageUpdate: queueAdapter.updateOne,
    removeMessage: queueAdapter.removeOne,
    clearMessages: queueAdapter.removeAll,

    MessageSetAll(state, action) {
      queueAdapter.setAll(state, action.payload);
    },
  },
});

export const MessageSelector = queueAdapter.getSelectors<RootState>(
  (state) => state.message
);

export const {
  addMessage,
  addMessages,
  removeMessage,
  MessageUpdate,
  MessageSetAll,
  clearMessages,
} = Messages.actions;

export default Messages.reducer;
