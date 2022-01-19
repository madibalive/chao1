import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
// import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

// const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch<AppDispatch>();

export { store, dispatch, useSelector, useDispatch };
