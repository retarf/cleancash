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

const baseURL = `${process.env.REACT_APP_BASE_URL}`;

const testQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const renderWithProviders = (ui: ReactElement, options?: RenderOptions) => {
    const providers = ({children}: {children: ReactElement}) => {
        return <QueryClientProvider client={testQueryClient}>
            {children}
        </QueryClientProvider>
    }

    return render(
        ui, {wrapper: providers, ...options}
    )
}

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

//jest.mock("./queries", () => [{"name": "test"}]);
//jest.mock("./queries", () => {error: "test"});

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 1)
  }
})


const testHandler = () => {
    return rest.get(`${baseURL}/fields`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
}

describe("FieldListComponent", () =>{
    const server = setupTestServer(...[testHandler()]);
    beforeEach(()=>{
        testQueryClient.clear();
    });
    test("testing fields elements", async () => {
        //TODO: Move to handlers
        //render(<FieldList url="/fields" />);
        renderWithProviders(<FieldList />);
        //render(FieldList());
        //render(<div>123</div>);
    });

})
