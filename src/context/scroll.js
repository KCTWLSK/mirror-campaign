import { createContext, useRef, useState, useContext, useEffect } from "react";

import { STATUS_OFF_SCREEN, STATUS_ENTERING, STATUS_LEAVING, STATUS_BACKWARD_ENTERING, STATUS_BACKWARD_LEAVING } from "@/data/constants";

export const ScrollContext = createContext({});
const { Provider } = ScrollContext;

const ScrollProvider = ({ children }) => {
  const [scrollPos, setScrollPos] = useState();

  const ref = useRef();

  return (
    <main
      ref={ref}
      onScroll={() => setScrollPos(ref.current.scrollTop)}
    >
      <Provider value={{ scrollPos }}>
        {children}
      </Provider>
    </main>
  );
};

export const useScrollProgress = (target) => {
  const [status, setStatus] = useState(STATUS_OFF_SCREEN);
  const [progress, setProgress] = useState(0);
  const { scrollPos } = useContext(ScrollContext);

  useEffect(() => {
    if (!target) return;

    const { top, bottom } = target.getBoundingClientRect();
    const vh = window.innerHeight;

    let newProgress = bottom < 0 ? 0 
      : bottom <= vh ? bottom / vh
        : top >= vh ? 0 : (vh - top) / vh;

    let newStatus;
    switch (status) {
      default:
      case STATUS_OFF_SCREEN:
        newStatus =
          newProgress === 0 ? STATUS_OFF_SCREEN
            : top < 0 ? STATUS_BACKWARD_ENTERING
              : STATUS_ENTERING;
        break;
      case STATUS_ENTERING:
        newStatus =
          newProgress > progress ? STATUS_ENTERING
            : top < 0 ? STATUS_LEAVING : STATUS_BACKWARD_LEAVING;
        break;
      case STATUS_LEAVING:
        newProgress === 1
        newStatus = newProgress > progress
          ? STATUS_BACKWARD_ENTERING : STATUS_LEAVING;
        break;
      case STATUS_BACKWARD_ENTERING:
        newStatus =
        newProgress > progress ? STATUS_BACKWARD_ENTERING
          : top < 0 ? STATUS_LEAVING : STATUS_BACKWARD_LEAVING;
      break;
      case STATUS_BACKWARD_LEAVING:
        newStatus = newProgress > progress
          ? STATUS_ENTERING : STATUS_BACKWARD_LEAVING;
        break;
    }

    setStatus(newStatus);
    setProgress(newProgress);
  }, [target, scrollPos]);

  useEffect(() => {
    if (progress || ![STATUS_LEAVING, STATUS_BACKWARD_LEAVING].includes(status)) return;
    setStatus(STATUS_OFF_SCREEN);
    setProgress(0);
  }, [status, progress]);

  return {
    status,
    progress:
      status === STATUS_LEAVING || status === STATUS_BACKWARD_LEAVING
        ? 1 - progress : progress,
  };
};

export default ScrollProvider;