import Script from "next/script";
import getConfig from "next/config";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "@/utils/muiTheme";

import DeviceContextProvider from "@/context/device";

import "@/styles/globals.scss";

const App = ({ Component, pageProps }) => {
  const { publicRuntimeConfig: { poptinUserId } } = getConfig();

  return (
    <ThemeProvider theme={muiTheme}>
      <Script src={`https://cdn.popt.in/pixel.js?id=${poptinUserId}`} async />
      <DeviceContextProvider>
        <Component {...pageProps} />
      </DeviceContextProvider>
    </ThemeProvider>
  );
};

export default App;
