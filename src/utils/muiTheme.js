import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4rem',
        }
      },
    },
  },
  typography: {
    fontFamily: '"Inter", Sans-Serif',
    h1: {
      fontSize: '60px',
    },
  },
  palette: {
    primary: {
      main: '#BCC6CC',
    },
    secondary: {
      main: '#D9D9D9',
    }
  }
});

export default theme;
