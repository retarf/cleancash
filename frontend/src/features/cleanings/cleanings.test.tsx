import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CleaningList } from "./components";
import { setupTestServer } from "../testUtils/setupTestServer";
import {
  handlers,
  testQueryClient,
  renderWithProviders,
} from "../testUtils/handlers";

import { APP_ROUTES } from "../../core/routes";
import { SetupServer } from "msw/node";

import { spies } from "../testUtils/spies";
import { children } from "../children/testData";
import { fields } from "../fields/testData";
import { salaries } from "../salary/testData";
import { cleanings } from "./testData";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Tests of the Cleaning List component.", () => {
  const server: SetupServer = setupTestServer(
    ...handlers(APP_ROUTES.CHILDREN.LIST, spies, children),
    ...handlers(APP_ROUTES.FIELDS.LIST, spies, fields),
    ...handlers(APP_ROUTES.SALARY.LIST, spies, salaries),
    ...handlers(APP_ROUTES.CLEANINGS.LIST, spies, cleanings)
  );
  beforeEach(() => {
    testQueryClient.clear();
    spies.resetAll();
  });
  it("Testing cleaning elements", async () => {
    renderWithProviders(<CleaningList />);
    const rows: HTMLElement[] = await screen.findAllByRole("row");
    // three elements rows, the title and the add row
    expect(rows).toHaveLength(5);
  });

  it("Click on the add sign open the create window.", async () => {
    renderWithProviders(<CleaningList />);
    const addButton: HTMLElement = await screen.findByRole("button", {
      name: "add",
    });
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/cleanings/create");
    });
  });

  it("Click on the row will open the edit window.", async () => {
    renderWithProviders(<CleaningList />);
    //const addButton: HTMLElement = await screen.findByRole("row", {name: "100.00"});
    const rows: HTMLElement[] = await screen.findAllByRole("row");
    const row = rows[1];
    fireEvent.click(row);
    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/cleanings/1");
    });
  });

  it("Click on the delete button will send delete request.", async () => {
    renderWithProviders(<CleaningList />);
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
