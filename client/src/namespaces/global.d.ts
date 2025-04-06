declare namespace GLOBAL {
  //User
  interface IUser {
    id: number;
    name: string;
  }

  interface IUsersList extends Array<IUser> {}

  interface IGetUserRequest {}
  interface IGetUserResponse extends IUsersList {}

  //Tickets
  interface ITicket {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
  }

  interface ITicketsList extends Array<ITicket> {}

  interface IGetTicketDetailRequest {
    ticketId: number;
  }
  interface IGetTicketDetailResponse extends ITicket {}

  interface IGetTicketsListRequest {}
  interface IGetTicketsListResponse extends ITicketsList {}

  //Mark Completed tickets
  interface IMarkCompletedTicketRequest {
    ticketId: number;
    onSuccess?: () => void;
  }
  interface IMarkCompletedTicketResponse {}

  //Mark inCompleted tickets
  interface IMarkInCompletedTicketRequest extends IMarkCompletedTicketRequest {}
  interface IMarkInCompletedTicketResponse {}

  //Add new ticket
  interface IAddNewTicketRequest {
    description: string;
    onSuccess?: () => void;
  }
  interface IAddNewTicketResponse {}

  //Assign ticket
  interface IAssignTicketRequest {
    ticketId: number;
    userId: number;
    onSuccess?: () => void;
  }
  interface IAssignTicketResponse {}
}
