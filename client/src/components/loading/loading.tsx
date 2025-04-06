import { memo, useCallback, useEffect, useRef } from "react";
import styles from "./loading.module.css";

type LoadingComponentProps = {
  loading: boolean | undefined;
};

const LoadingComponent = memo((props: LoadingComponentProps) => {
  const { loading } = props;
  const divRef = useRef<HTMLDivElement>(null);

  const progressBar = useCallback(() => {
    const timer = setInterval(frame, (5 * 300) / 100);
    if (!loading) return clearInterval(timer);
    let direction = true;
    let width = 5;

    function frame() {
      if (width < 100 && direction) {
        width++;
        if (divRef.current) divRef.current.style.width = width + "%";
        return;
      }
      if (width > 0 && !direction) {
        width--;
        if (divRef.current) divRef.current.style.width = width + "%";
        return;
      }
      direction = !direction;
      return;
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  useEffect(progressBar, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-progess-bar"]}>
        <div
          ref={divRef}
          style={{ width: "1%" }}
          className={styles["loading-completed"]}
        />
      </div>
    </div>
  );
});

export default LoadingComponent;
