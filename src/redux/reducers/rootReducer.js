import { combineReducers } from "redux";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactReducer,
});

export default rootReducer;
