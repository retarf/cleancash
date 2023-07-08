import React from "react";
import Button from "@mui/material/Button";
import "@fontsource/roboto/400.css";
import { BrowserRouter } from "react-router-dom";

import { Dashboard } from "./features";
import { MainContainer } from "./core";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <BrowserRouter>
      <MainContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  );
}

export default App;
