import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // para poder realizar async actions
import rootReducer from "../reducer/reducer";

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;