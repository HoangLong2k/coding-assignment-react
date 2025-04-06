import { fetchClient } from "../utils/request";

const globalServices = {
  getUser: (): Promise<GLOBAL.IGetUserResponse> =>
    fetchClient.get("/api/users"),

  getTicketsList: (): Promise<GLOBAL.IGetTicketsListResponse> =>
    fetchClient.get("/api/tickets"),

  getTicketsDetail: (
    body: GLOBAL.IGetTicketDetailRequest
  ): Promise<GLOBAL.IGetTicketDetailResponse> => {
    const { ticketId } = body;
    return fetchClient.get(`/api/tickets/${ticketId}`);
  },

  markCompletedTicket: (
    body: GLOBAL.IMarkCompletedTicketRequest
  ): Promise<GLOBAL.IMarkCompletedTicketResponse> => {
    const { ticketId } = body;
    return fetchClient.put(`/api/tickets/${ticketId}/complete`);
  },

  markInCompletedTicket: (
    body: GLOBAL.IMarkInCompletedTicketRequest
  ): Promise<GLOBAL.IMarkInCompletedTicketResponse> => {
    const { ticketId } = body;
    return fetchClient.delete(`/api/tickets/${ticketId}/complete`);
  },

  addNewTicket: (
    body: GLOBAL.IAddNewTicketRequest
  ): Promise<GLOBAL.IAddNewTicketResponse> =>
    fetchClient.post(`/api/tickets`, body),

  assignTicket: (
    body: GLOBAL.IAssignTicketRequest
  ): Promise<GLOBAL.IAssignTicketResponse> => {
    const { ticketId, userId } = body;
    return fetchClient.put(`/api/tickets/${ticketId}/assign/${userId}`);
  },
};

export { globalServices };
