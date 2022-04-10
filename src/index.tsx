import { render } from "react-dom";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "./App";
import Title from "./Title";
import Info from "./Info";
import Footer from "./Footer";
import "./styles.css";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8be9fd"
    },
    secondary: {
      main: "#ff79c6"
    }
  }
});

const rootElement = document.getElementById("root");
render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CssBaseline />
        <Title />
        <Info />
        <App />
        <Footer />
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  rootElement
);
