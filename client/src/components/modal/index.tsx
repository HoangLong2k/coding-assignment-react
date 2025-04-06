import {
  useImperativeHandle,
  useState,
  forwardRef,
  PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import Button from "../button";

interface IModalProps extends PropsWithChildren {
  title?: string;
  onConfirm?: () => void;
}

export interface IModalRef {
  open: () => void;
  close: () => void;
}

const Modal = (props: IModalProps, ref: React.Ref<IModalRef> | undefined) => {
  const { children, title, onConfirm } = props;
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  return (
    <>
      {isVisible
        ? createPortal(
            <div className={styles["modal-overlay"]}>
              <div className={styles["modal-content"]}>
                <h3>{title}</h3>
                {children}
                <div className={styles["modal-footer"]}>
                  <Button onClick={() => setIsVisible(false)}>Close</Button>
                  <Button onClick={handleConfirm}>Confirm</Button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default forwardRef(Modal);
