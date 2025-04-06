import { NS_GLOBAL, IGlobalState } from "../stores/global/state";

export interface IApplicationRootState {
  readonly [NS_GLOBAL]: IGlobalState;
}
