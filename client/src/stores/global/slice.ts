import initialState, { NS_GLOBAL } from "../global/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: NS_GLOBAL,
  initialState,
  reducers: {
    getUserAction() {},
    getUserCompletedAction(
      state,
      action: PayloadAction<GLOBAL.IGetUserResponse>
    ) {
      state.user.data = action.payload;
    },
    getTicketsListAction() {},
    getTicketsListCompletedAction(
      state,
      action: PayloadAction<GLOBAL.IGetTicketsListResponse>
    ) {
      state.tickets.data = action.payload;
    },
    assignTicketAction(_, __: PayloadAction<GLOBAL.IAssignTicketRequest>) {},
    addNewTicketAction(_, __: PayloadAction<GLOBAL.IAddNewTicketRequest>) {},
    markCompletedTicketAction(
      _,
      __: PayloadAction<GLOBAL.IMarkCompletedTicketRequest>
    ) {},
    markInCompletedTicketAction(
      _,
      __: PayloadAction<GLOBAL.IMarkCompletedTicketRequest>
    ) {},
    getTicketDetailAction(
      _,
      __: PayloadAction<GLOBAL.IGetTicketDetailRequest>
    ) {},
    resetTicketDetailAction(state) {
      state.ticketDetail.data = null;
    },
    getTicketDetailCompletedAction(
      state,
      action: PayloadAction<GLOBAL.IGetTicketDetailResponse>
    ) {
      state.ticketDetail.data = action.payload;
    },
  },
});

// Actions
export const {
  getUserAction,
  getUserCompletedAction,
  getTicketsListAction,
  getTicketsListCompletedAction,
  assignTicketAction,
  markCompletedTicketAction,
  markInCompletedTicketAction,
  addNewTicketAction,
  getTicketDetailAction,
  getTicketDetailCompletedAction,
  resetTicketDetailAction,
} = globalSlice.actions;

// Reducer
export const globalReducer = globalSlice.reducer;
