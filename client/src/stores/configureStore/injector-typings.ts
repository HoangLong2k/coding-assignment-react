import type { Reducer } from "@reduxjs/toolkit";
import { type IApplicationRootState } from "../../types";

type RequiredRootState = Required<IApplicationRootState>;

export type RootStateKeyType = keyof IApplicationRootState;

export type InjectedReducersType = {
  [P in RootStateKeyType]?: Reducer<RequiredRootState[P]>;
};
