import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";

import rootReducer from "./reducers";

const middlewares = [thunkMiddleware];
const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  };
  
const pReducer: any = persistReducer(persistConfig, rootReducer);

const enhancers: any = [middlewareEnhancer];
const composedEnhancers: any = compose(...enhancers);

export const store = createStore(pReducer, composedEnhancers);
export const persistor = persistStore(store);
  
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;