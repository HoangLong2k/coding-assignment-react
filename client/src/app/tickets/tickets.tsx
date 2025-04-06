import styles from "./tickets.module.css";
import {
  getUserAction,
  getTicketsListAction,
  markCompletedTicketAction,
  markInCompletedTicketAction,
  addNewTicketAction,
  assignTicketAction,
} from "../../stores/global/slice";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../stores/configureStore/hooks";
import {
  selectorTicketsList,
  selectorUserList,
} from "client/src/stores/global/selector";
import { Button, IModalRef, Modal } from "../../components";
import { useNavigate } from "react-router-dom";

export interface TicketsProps {}

export function Tickets() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { usersList } = useAppSelector(selectorUserList);
  const { ticketsList } = useAppSelector(selectorTicketsList);
  const [selectedItem, setSelectedItem] = useState<GLOBAL.ITicket | null>(null);

  const modalAddNewRef = useRef<IModalRef>(null);
  const modalAssignRef = useRef<IModalRef>(null);
  const inputDescriptionRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const onMarkTicket = (ticketId: number, completed: boolean) => {
    if (completed) {
      dispatch(
        markInCompletedTicketAction({
          ticketId: ticketId,
          onSuccess: onSubmitSuccess,
        })
      );
      return;
    }
    dispatch(
      markCompletedTicketAction({
        ticketId: ticketId,
        onSuccess: onSubmitSuccess,
      })
    );
  };

  const onConfirmAddNewTicket = () => {
    dispatch(
      addNewTicketAction({
        description: inputDescriptionRef.current?.value || "",
        onSuccess: onSubmitSuccess,
      })
    );
  };

  const onConfirmAssignTicket = () => {
    dispatch(
      assignTicketAction({
        ticketId: selectedItem?.id || 0,
        userId: Number(selectRef.current?.value),
        onSuccess: onSubmitSuccess,
      })
    );
  };

  const onSubmitSuccess = () => {
    dispatch(getTicketsListAction());
  };

  const onOpenModalAddNew = () => {
    modalAddNewRef.current?.open();
  };

  const onOpenModalAssign = (item: GLOBAL.ITicket) => {
    setSelectedItem(item);
    modalAssignRef.current?.open();
  };

  const onNavigateDetail = (id: number) => {
    navigate(`/${id}`);
  };

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
    dispatch(getUserAction());
    dispatch(getTicketsListAction());
  }, []);

  return (
    <div className={styles["tickets-list-container"]}>
      <div className={styles["title"]}>
        <h3>Tickets List</h3>
        <Button className={styles["assign-btn"]} onClick={onOpenModalAddNew}>
          Add new +
        </Button>
      </div>
      {ticketsList ? (
        <ul>
          {ticketsList.map((t) => (
            <li
              key={t.id}
              className={styles["ticket-item"]}
              onClick={() => onNavigateDetail(t.id)}
            >
              <div className={styles["ticket-info"]}>
                <div>
                  Ticket: {t.id}, <b>{t.description}</b>
                </div>
                {!!mappingAssignee(t.assigneeId) && (
                  <div>
                    Assignee: <b>{mappingAssignee(t.assigneeId)}</b>
                  </div>
                )}
              </div>
              <div className={styles["ticket-actions"]}>
                <Button
                  className={styles["assign-btn"]}
                  onClick={() => {
                    onOpenModalAssign(t);
                  }}
                >
                  {!!mappingAssignee(t.assigneeId)
                    ? "Reassign"
                    : "Assign to member"}
                </Button>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkTicket(t.id, t.completed);
                  }}
                  className={
                    t.completed
                      ? styles["complete-icon"]
                      : styles["inCompleted-icon"]
                  }
                >
                  ✔
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
      <Modal
        ref={modalAddNewRef}
        title="Add new ticket"
        onConfirm={onConfirmAddNewTicket}
      >
        <div className={styles["modal-content"]}>
          <div>Ticket description</div>
          <input placeholder="Enter your answer" ref={inputDescriptionRef} />
        </div>
      </Modal>
      <Modal
        ref={modalAssignRef}
        title="Assign to member"
        onConfirm={onConfirmAssignTicket}
      >
        <select
          className={styles["select-actions"]}
          defaultValue={selectedItem?.assigneeId}
          ref={selectRef}
        >
          {usersList?.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </Modal>
    </div>
  );
}

export default Tickets;
