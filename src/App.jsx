import ResumeBasics from "./Pages/ResumeBasics";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <SnackbarProvider>
        <ResumeBasics />
      </SnackbarProvider>
    </>
  );
}

export default App;
