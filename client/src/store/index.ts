import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import reducers from "./reducers";
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducers = combineReducers(reducers);

// export const store = createStore(rootReducers, applyMiddleware(thunk, logger));
export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

// export const store = createStore(rootReducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
