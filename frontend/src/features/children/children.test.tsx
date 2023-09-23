import React from "react";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import {ChildList} from "./components";
import {setupTestServer} from "../testUtils/setupTestServer";
import {
    handlers,
    testQueryClient,
    renderWithProviders,
} from "../testUtils/handlers";

import {APP_ROUTES} from "../../core/routes";
import {SetupServer} from "msw/node";

import {spies} from "../testUtils/spies";


type ChildObject = {
    id: number,
    name: string,
    fields: number[]
}

const Child: ChildObject = {
    id: 1,
    name: "first",
    fields: [1, 2]
}

const children: ChildObject[] = [
    Child,
    {
        id: 2,
        name: "Second",
        fields: [1, 2]
    },
    {
        id: 3,
        name: "Third",
        fields: [1, 2]
    },
];

const mockedNavigator = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator
}));

describe("FieldListComponent", () => {
    const server: SetupServer = setupTestServer(
        ...handlers(APP_ROUTES.CHILDREN.LIST, spies, children)
    );
    beforeEach(() => {
        testQueryClient.clear();
        spies.resetAll();
    });
    it("testing fields elements", async () => {
        renderWithProviders(<ChildList/>);
        const rows: HTMLElement[] = await screen.findAllByRole("row");
        // three elements rows, the title and the add row
        expect(rows).toHaveLength(5);
    });

    it("Click on the add sign open the create window.", async () => {
        renderWithProviders(<ChildList/>);
        const addButton: HTMLElement = await screen.findByRole("button", {
            name: "add",
        });
        fireEvent.click(addButton);
        await waitFor(() => {
            expect(mockedNavigator).toHaveBeenCalledWith('/children/create');
        })
    });

    it("Click on the add sign open the edit window.", async () => {
        renderWithProviders(<ChildList/>);
        const addButton: HTMLElement = await screen.findByRole("row", {name: "first"});
        fireEvent.click(addButton);
        await waitFor(() => {
            expect(mockedNavigator).toHaveBeenCalledWith('/children/1');
        })
    });

    it("Click on the delete button will send delete request.", async () => {
      renderWithProviders(<ChildList />);
      const deleteButtons: HTMLElement[] = await screen.findAllByRole("button", {
        name: "Delete",
      });
      const deleteButton: HTMLElement = deleteButtons[0];
      fireEvent.click(deleteButton);
      await waitFor(() => {
        expect(spies.delete).toBeCalledTimes(1);
      });
    });
});
