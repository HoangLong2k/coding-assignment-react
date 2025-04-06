import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { createReducer } from "./reducers";
import rootSaga from "./rootSaga";

const setupStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
        sagaMiddleware
      ),
  });

  sagaMiddleware.run(rootSaga);

  window._store = store;

  return store;
};

export default setupStore;
