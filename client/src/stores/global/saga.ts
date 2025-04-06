import { call, put, spawn, takeLatest } from "redux-saga/effects";
import {
  getUserAction,
  getUserCompletedAction,
  getTicketsListAction,
  getTicketsListCompletedAction,
  assignTicketAction,
  markCompletedTicketAction,
  markInCompletedTicketAction,
  addNewTicketAction,
  getTicketDetailCompletedAction,
  getTicketDetailAction,
} from "./slice";

import { globalServices } from "../../services/global";
import { PayloadAction } from "@reduxjs/toolkit";

function* sagaGetUser() {
  try {
    const response: GLOBAL.IGetUserResponse | undefined = yield call(
      globalServices.getUser
    );

    if (typeof response !== "undefined") {
      yield put(getUserCompletedAction(response));
    }
  } catch (error: any) {
    console.error("Error in sagaGetUser:", error);
  }
}

function* sagaGetTicket() {
  try {
    const response: GLOBAL.IGetTicketsListResponse | undefined = yield call(
      globalServices.getTicketsList
    );

    if (typeof response !== "undefined") {
      yield put(getTicketsListCompletedAction(response));
    }
  } catch (error: any) {
    console.error("Error in sagaGetTicket:", error);
  }
}

function* sagaGetTicketDetail(
  action: PayloadAction<GLOBAL.IGetTicketDetailRequest>
) {
  try {
    const { ticketId } = action.payload;
    const response: GLOBAL.IGetTicketDetailResponse | undefined = yield call(
      globalServices.getTicketsDetail,
      { ticketId }
    );

    if (typeof response !== "undefined") {
      yield put(getTicketDetailCompletedAction(response));
    }
  } catch (error: any) {
    console.error("Error in sagaGetTicketDetail:", error);
  }
}

function* sagaMarkCompletedTicket(
  action: PayloadAction<GLOBAL.IMarkCompletedTicketRequest>
) {
  try {
    const { ticketId, onSuccess } = action.payload;
    yield call(globalServices.markCompletedTicket, { ticketId });
    onSuccess?.();
  } catch (error: any) {
    console.error("Error in sagaMarkCompletedTicket:", error);
  }
}

function* sagaMarkInCompletedTicket(
  action: PayloadAction<GLOBAL.IMarkCompletedTicketRequest>
) {
  try {
    const { ticketId, onSuccess } = action.payload;
    yield call(globalServices.markInCompletedTicket, { ticketId });
    onSuccess?.();
  } catch (error: any) {
    console.error("Error in sagaMarkInCompletedTicket:", error);
  }
}

function* sagaAddNewTicket(action: PayloadAction<GLOBAL.IAddNewTicketRequest>) {
  try {
    const { description, onSuccess } = action.payload;
    yield call(globalServices.addNewTicket, { description });
    onSuccess?.();
  } catch (error: any) {
    console.error("Error in sagaAddNewTicket:", error);
  }
}

function* sagaAssignTicket(action: PayloadAction<GLOBAL.IAssignTicketRequest>) {
  try {
    const { ticketId, userId, onSuccess } = action.payload;
    yield call(globalServices.assignTicket, { ticketId, userId });
    onSuccess?.();
  } catch (error: any) {
    console.error("Error in sagaAssignTicket:", error);
  }
}

export default function* globalSaga() {
  yield takeLatest(getUserAction, sagaGetUser);
  yield takeLatest(getTicketsListAction, sagaGetTicket);
  yield takeLatest(markCompletedTicketAction, sagaMarkCompletedTicket);
  yield takeLatest(markInCompletedTicketAction, sagaMarkInCompletedTicket);
  yield takeLatest(addNewTicketAction, sagaAddNewTicket);
  yield takeLatest(assignTicketAction, sagaAssignTicket);
  yield takeLatest(getTicketDetailAction, sagaGetTicketDetail);
}
