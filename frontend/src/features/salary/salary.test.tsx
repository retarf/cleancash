import React, {ReactElement} from "react";
import {screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SalaryList from "./components";
import {setupTestServer} from "../testUtils/setupTestServer";
import { handlers, testQueryClient, renderWithProviders} from "../testUtils/handlers";

import {APP_ROUTES} from "../../core/routes";
import {SetupServer} from "msw/node";

type Salary = {
    "id": number
    "value": string
}

const salary: Salary  = {
    "id": 1,
    "value": "100.00"
}

const salaries: Salary[] = [
    salary,
    {
        "id": 2,
        "value": "200.00"
    },
    {
        "id": 3,
        "value": "300.00"
    },
];


describe("SalaryList component", () =>{
    const server: SetupServer = setupTestServer(...handlers(APP_ROUTES.SALARY.LIST, salaries));
    beforeEach(()=>{
        testQueryClient.clear();
    });
    it("testing salary elements", async () => {
        renderWithProviders(<SalaryList />);
        const rows = await screen.findAllByRole("row");
        // three elements rows, the title and the add row
        expect(rows).toHaveLength(5)
    });

})
