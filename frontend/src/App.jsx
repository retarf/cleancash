import React from "react";
import "@fontsource/roboto/400.css";
import { BrowserRouter } from "react-router-dom";

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
