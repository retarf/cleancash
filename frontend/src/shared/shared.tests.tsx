import { EditableTableRow } from "./TableRow";
import React, { ReactElement } from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setupTestServer } from "../testUtils/setupTestServer";
import {
  handlers,
  testQueryClient,
  renderWithProviders,
} from "../testUtils/handlers";
import { Field } from "./models/Field.model";

import { APP_ROUTES } from "../../core/routes";
import { SetupServer } from "msw/node";

/*
describe("EditableTableRow", () =>{
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

    it("test of navigation", async () => {
        const mock = jest.mock("../../shared");
        renderWithProviders(<FieldList />);
        //const textBox: HTMLElement[] = await screen.findAllByRole("textbox");

        //expect(textBox).toBeNull();

        const rows: HTMLElement[] = await screen.findAllByRole("row");
        const firstRow: HTMLElement = rows[1];
        firstRow.click()
        // const textBox: HTMLElement[] = await screen.findAllByRole("textbox");
        // expect(textBox).to
        //console.log(mock.mock.length)
    })

})
*/
