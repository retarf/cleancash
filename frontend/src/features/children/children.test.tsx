import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChildList } from "./components";
import { setupTestServer } from "../testUtils/setupTestServer";
import {
  handlers,
  testQueryClient,
  renderWithProviders,
} from "../testUtils/handlers";

import { APP_ROUTES } from "../../core/routes";
import { SetupServer } from "msw/node";

import { spies } from "../testUtils/spies";
import { children } from "./testData";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

describe("Tests of the Children List Component.", () => {
  const server: SetupServer = setupTestServer(
    ...handlers(APP_ROUTES.CHILDREN.LIST, spies, children)
  );
  beforeEach(() => {
    testQueryClient.clear();
    spies.resetAll();
  });
  it("Test of the ChildList element.", async () => {
    renderWithProviders(<ChildList />);
    const rows: HTMLElement[] = await screen.findAllByRole("row");
    // three elements rows, the title and the add row
    expect(rows).toHaveLength(5);
  });

  it("Click on the add sign open the create window.", async () => {
    renderWithProviders(<ChildList />);
    const addButton: HTMLElement = await screen.findByRole("button", {
      name: "add",
    });
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/children/create");
    });
  });

  it("Click on the add sign open the edit window.", async () => {
    renderWithProviders(<ChildList />);
    const addButton: HTMLElement = await screen.findByRole("row", {
      name: "First",
    });
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith("/children/1");
    });
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
