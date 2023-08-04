import React, {ReactElement} from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {render, fireEvent, screen, RenderOptions} from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldList } from "./components";
import { FieldsQuery } from "./queries";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import App from "../../App";
import {setupTestServer} from "../testUtils/setupTestServer";
import { testHandler, testQueryClient, renderWithProviders} from "../../shared/testHandlers";

import {APP_ROUTES} from "../../core/routes";

const baseURL = `${process.env.REACT_APP_BASE_URL}`;


const fields = [
    {
        "name": "field1"
    },
    {
        "name": "field2"
    },
    {
        "name": "field3"
    },
]


describe("FieldListComponent", () =>{
    const server = setupTestServer(...[testHandler(APP_ROUTES.FIELDS.LIST)]);
    beforeEach(()=>{
        testQueryClient.clear();
    });
    test("testing fields elements", async () => {
        renderWithProviders(<FieldList />);
    });

})
