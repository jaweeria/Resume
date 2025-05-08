import { useState } from "react";
import ResumeBasics from "./Pages/ResumeBasics";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
function App() {
  return (
    <>
      <SnackbarProvider>
        {" "}
        <ResumeBasics />
      </SnackbarProvider>
    </>
  );
}

export default App;
