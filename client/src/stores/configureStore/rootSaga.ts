import globalSaga from "../global/saga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([globalSaga()]);
}
