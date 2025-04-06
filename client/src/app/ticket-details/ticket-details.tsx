import {
  useAppDispatch,
  useAppSelector,
} from "client/src/stores/configureStore/hooks";
import styles from "./ticket-details.module.css";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getTicketDetailAction,
  resetTicketDetailAction,
} from "../../stores/global/slice";
import {
  selectorTicketsDetail,
  selectorUserList,
} from "../../stores/global/selector";
export interface TicketDetailsProps {}

export function TicketDetails() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { ticketDetail } = useAppSelector(selectorTicketsDetail);
  const { usersList } = useAppSelector(selectorUserList);

  const mappingAssignee = useCallback(
    (id?: number) => {
      if (!id) {
        return "";
      }
      return usersList?.find((u) => u.id === id)?.name || "";
    },
    [usersList]
  );

  useEffect(() => {
    dispatch(getTicketDetailAction({ ticketId: Number(params["id"]) }));
    return () => {
      dispatch(resetTicketDetailAction());
    };
  }, []);

  return (
    <div className={styles["container"]}>
      <h1>Ticket Detail</h1>
      <h2>Id: {ticketDetail?.id}</h2>
      <h3>Description: {ticketDetail?.description}</h3>
      <h4>Assignee: {mappingAssignee(ticketDetail?.assigneeId)}</h4>
    </div>
  );
}

export default TicketDetails;
