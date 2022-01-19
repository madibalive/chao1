import { combineReducers } from "redux";
// import { persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";
// slices
import userReducer from "./slices/user";
import messageReducer from "./slices/message";

// ----------------------------------------------------------------------

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   keyPrefix: "redux-",
//   whitelist: ["sortBy", "songs"],
// };

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});

export { rootReducer };
