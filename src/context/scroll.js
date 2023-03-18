import { createContext, useRef, useState, useContext, useEffect } from "react";

export const ScrollContext = createContext({});
const { Provider } = ScrollContext;

export const ScrollContextProvider = ({ children }) => {
  const [scrollPos, setScrollPos] = useState();

  const ref = useRef();
  console.log(scrollPos)
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        width: '100dvw',
        height: '100vh',
        height: '100dvh',
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
      }}
      ref={ref}
      onScroll={() => setScrollPos(ref.current.scrollTop)}
    >
      <Provider value={{ scrollPos }}>
        {children}
      </Provider>
    </div>
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

export default ScrollContextProvider;