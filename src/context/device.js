import { createContext, useState, useEffect, useContext } from "react";

import { MEDIA_PREFER_PORTRAIT_MODE } from "@/data/constants";

const DeviceContext = createContext({});
const { Provider } = DeviceContext;

export const DeviceContextProvider = ({ children }) => {
  const [isPreferPortraitMode, setIsPreferPortraitMode] = useState();

  useEffect(() => {
    const windowResizeHandler = () => {
      const { matches } = window.matchMedia(MEDIA_PREFER_PORTRAIT_MODE);
      setIsPreferPortraitMode(matches);
    };

    windowResizeHandler();
    window.addEventListener('resize', windowResizeHandler);
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

  return (
    <Provider value={{ isPreferPortraitMode }}>
      {children}
    </Provider>
  );
};

export const useIsPreferPortraitMode = () => {
  const { isPreferPortraitMode } = useContext(DeviceContext);
  return isPreferPortraitMode;
};

export default DeviceContextProvider;