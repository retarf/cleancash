import React, {ReactElement} from "react";
import {screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldList } from "./components";
import {setupTestServer} from "../testUtils/setupTestServer";
import { handlers, testQueryClient, renderWithProviders} from "../testUtils/handlers";
import { Field } from "./models/Field.model";
import { act } from "react-dom/test-utils";

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
        const rows: HTMLElement[] = await screen.findAllByRole("row");
        // three elements rows, the title and the add row
        expect(rows).toHaveLength(5)
    });

    it("Click on the second row doesn't allow to multiple inputs.", async () => {
        renderWithProviders(<FieldList />);
        const rows: HTMLElement[] = await screen.findAllByRole("row");
        const firstRow: HTMLElement = rows[1];
        const secondRow: HTMLElement = rows[2];
        act(() => {
            firstRow.click();
        })
        act(() => {
            secondRow.click();
        })
        const textBox: HTMLElement[] = await screen.findAllByRole("textbox");
        expect(textBox).toHaveLength(1);
        expect(textBox[0]).toHaveValue("field1");
    })

    it("Click on inputs cancel returns to text field.", async () => {
        renderWithProviders(<FieldList />);
        const rows: HTMLElement[] = await screen.findAllByRole("row");
        const firstRow: HTMLElement = rows[1];
        act(() => {
            firstRow.click();
        })
        const cancelButton: HTMLElement = screen.getByRole("button", {"name": "Cancel"});
        act(() => {
            cancelButton.click();
        })
        const textBox: HTMLElement[] = screen.queryAllByRole("textbox");
        expect(textBox).toHaveLength(0);
    })

    it("Click on the add sign open a new input.", async () => {
        renderWithProviders(<FieldList />);
        const addButton: HTMLElement = await screen.findByRole("button", {"name": "add"});
        act(() => {
            addButton.click();
        })
        const textBox: HTMLElement[] = await screen.findAllByRole("textbox");
        expect(textBox).toHaveLength(1);
        expect(textBox[0]).toHaveValue("");
    })
})
