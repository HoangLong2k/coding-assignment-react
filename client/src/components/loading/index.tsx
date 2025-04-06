import { useEffect, useReducer } from "react";
import { BehaviorSubject } from "rxjs";
import LoadingComponent from "./loading";
import { CUSTOM_WINDOW_EVENT, LOADING_DELAY_TIME } from "../../utils/constant";

const loadingSubject = new BehaviorSubject<boolean | undefined>(undefined);

export const toggleLoading = (value: boolean | undefined) => {
  if (value === undefined) return;

  document?.dispatchEvent(
    new CustomEvent<boolean>(CUSTOM_WINDOW_EVENT.SET_LOADING, {
      detail: value,
    })
  );

  loadingSubject?.next(value);
};

type LoadingState = {
  // undefined: first mount
  loading: boolean | undefined;
};

type LoadingProps = LoadingState;

const Loading = ({ loading }: LoadingProps) => {
  const [componentState, setComponentState] = useReducer(
    (state: LoadingState, newState: LoadingState) => ({
      ...state,
      ...newState,
    }),
    {
      loading,
    }
  );

  useEffect(() => {
    let subscribeTimer: NodeJS.Timeout;
    const subscribe = loadingSubject.subscribe((value) => {
      if (value === undefined) return;

      if (value) {
        window.COUNT_CURRENT_REQUEST++;
        setComponentState({
          loading: true,
        });
        return;
      }

      window.COUNT_CURRENT_REQUEST =
        window.COUNT_CURRENT_REQUEST > 0 ? window.COUNT_CURRENT_REQUEST - 1 : 0;

      clearTimeout(subscribeTimer);
      subscribeTimer = setTimeout(() => {
        window.COUNT_CURRENT_REQUEST <= 0 &&
          setComponentState({
            loading: false,
          });
        clearTimeout(subscribeTimer);
      }, LOADING_DELAY_TIME);
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  return <LoadingComponent loading={componentState.loading} />;
};

export default Loading;
