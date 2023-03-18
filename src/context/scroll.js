import { createContext, useRef, useState, useContext, useEffect } from "react";

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
  const [scrollProgress, setScrollProgress] = useState();
  const { scrollPos } = useContext(ScrollContext);

  useEffect(() => {
    if (!target) return;

    const { top, bottom } = target.getBoundingClientRect();
    if (scrollPos < top) return;

    const vh = window.innerHeight;
    setScrollProgress(
      bottom < 0 ? 0
        : bottom <= vh ? bottom / vh
          : top >= vh ? 0
            : (vh - top) / vh
    );
  }, [target, scrollPos]);

  return scrollProgress;
};

export default ScrollProvider;