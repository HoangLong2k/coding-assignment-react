export const NS_GLOBAL = "NS_GLOBAL";

export type IGlobalState = {
  user: {
    data?: GLOBAL.IUsersList | null;
  };
  tickets: {
    data?: GLOBAL.ITicketsList | null;
  };
  ticketDetail: {
    data?: GLOBAL.ITicket | null;
  };
};

const state: IGlobalState = {
  user: {
    data: null,
  },
  tickets: {
    data: null,
  },
  ticketDetail: {
    data: null,
  },
};

export default state;
