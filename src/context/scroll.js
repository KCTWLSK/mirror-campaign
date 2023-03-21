import { createContext, useRef, useState, useContext, useEffect } from "react";

import {
  STATUS_OFF_SCREEN,
  STATUS_ENTERING,
  STATUS_LEAVING,
  STATUS_ENTERING_BACKWARD,
  STATUS_LEAVING_BACKWARD,
  STATUS_OFF_SCREEN_AFTER,
} from "@/data/constants";

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
      case STATUS_OFF_SCREEN_AFTER:
        newStatus =
          newProgress === 0 ? status
            : top < 0 ? STATUS_ENTERING_BACKWARD
              : STATUS_ENTERING;
        break;
      case STATUS_ENTERING:
        newStatus =
          newProgress > progress ? STATUS_ENTERING
            : top < 0 ? STATUS_LEAVING : STATUS_LEAVING_BACKWARD;
        break;
      case STATUS_LEAVING:
        newStatus =
          newProgress === 0 ? STATUS_OFF_SCREEN_AFTER
            : newProgress > progress
              ? STATUS_ENTERING_BACKWARD : STATUS_LEAVING;
        break;
      case STATUS_ENTERING_BACKWARD:
        newStatus =
        newProgress > progress ? STATUS_ENTERING_BACKWARD
          : top < 0 ? STATUS_LEAVING : STATUS_LEAVING_BACKWARD;
      break;
      case STATUS_LEAVING_BACKWARD:
        newStatus = newProgress > progress
          ? STATUS_ENTERING : STATUS_LEAVING_BACKWARD;
        break;
    }

    setStatus(newStatus);
    setProgress(newProgress);
  }, [target, scrollPos]);

  useEffect(() => {
    if (progress || ![STATUS_LEAVING, STATUS_LEAVING_BACKWARD].includes(status)) return;
    setStatus(STATUS_OFF_SCREEN);
    setProgress(0);
  }, [status, progress]);

  return {
    status,
    progress:
      [STATUS_OFF_SCREEN_AFTER, STATUS_LEAVING, STATUS_LEAVING_BACKWARD].includes(status)
        ? 1 - progress : progress,
    fullProgress:
      status === STATUS_OFF_SCREEN ? 0
        : status === STATUS_OFF_SCREEN_AFTER ? 1
          : [STATUS_ENTERING, STATUS_LEAVING_BACKWARD].includes(status)
            ? progress / 2 : 0.5 + (1 - progress) / 2,
  };
};

export default ScrollProvider;