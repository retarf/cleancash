import React from "react";
import Button from "@mui/material/Button";
import "@fontsource/roboto/400.css";

import { ChildList } from "./components/children/controller";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ChildList />
    </BrowserRouter>
  );
}

export default App;
