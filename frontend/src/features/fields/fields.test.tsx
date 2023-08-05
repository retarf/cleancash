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
import { testHandler, testQueryClient, renderWithProviders} from "../testUtils/handlers";

import {APP_ROUTES} from "../../core/routes";

const baseURL = `${process.env.REACT_APP_BASE_URL}`;


const fields = {"fields": [
    {
        "name": "field1"
    },
    {
        "name": "field2"
    },
    {
        "name": "field3"
    },
]};


describe("FieldListComponent", () =>{
    const server = setupTestServer(...[testHandler(APP_ROUTES.FIELDS.LIST, fields)]);
    beforeEach(()=>{
        testQueryClient.clear();
    });
    test("testing fields elements", async () => {
        renderWithProviders(<FieldList />);
        const item = await screen.findByText("field1");
        expect(item).toBeInTheDocument();
    });

})
