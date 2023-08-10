import React, {ReactElement} from "react";
import {screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldList } from "./components";
import {setupTestServer} from "../testUtils/setupTestServer";
import { handlers, testQueryClient, renderWithProviders} from "../testUtils/handlers";
import { Field } from "./models/Field.model";

import {APP_ROUTES} from "../../core/routes";
import {SetupServer} from "msw/node";

const field: Field = {
    "id": 1,
    "name": "field1"
}

const fields: Field[] = [
    field,
    {
        "id": 2,
        "name": "field2"
    },
    {
        "id": 3,
        "name": "field3"
    },
];


describe("FieldListComponent", () =>{
    const server: SetupServer = setupTestServer(...handlers(APP_ROUTES.FIELDS.LIST, fields));
    beforeEach(()=>{
        testQueryClient.clear();
    });
    it("testing fields elements", async () => {
        renderWithProviders(<FieldList />);
        const rows = await screen.findAllByRole("row");
        // three elements rows and the title
        expect(rows).toHaveLength(4)
    });

})
