import { type InjectedReducersType } from "./injector-typings";
import { combineReducers } from "@reduxjs/toolkit";
import { globalReducer } from "../global/slice";
import { NS_GLOBAL } from "../global/state";

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const combinedReducer = combineReducers({
    [NS_GLOBAL]: globalReducer,
    ...injectedReducers,
  });

  const rootReducer = (state: any, action: any) => {
    const newState = { ...state };
    if (action.type === "global/logout") {
      Object.keys(newState).forEach((i: string) => {
        newState[i] = undefined;
      });
    }
    return combinedReducer(newState, action);
  };

  return rootReducer;
}
