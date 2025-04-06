import initialState, { NS_GLOBAL, type IGlobalState } from "../global/state";
import { type IApplicationRootState } from "../../types";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

const currentState = (state: IApplicationRootState) =>
  state?.[NS_GLOBAL] || initialState;

export const selectorUserList = createDraftSafeSelector(
  currentState,
  (state: IGlobalState) => ({
    usersList: state.user.data,
  })
);

export const selectorTicketsList = createDraftSafeSelector(
  currentState,
  (state: IGlobalState) => ({
    ticketsList: state.tickets.data,
  })
);

export const selectorTicketsDetail = createDraftSafeSelector(
  currentState,
  (state: IGlobalState) => ({
    ticketDetail: state.ticketDetail.data,
  })
);
