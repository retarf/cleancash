import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldList } from "../components/fieldList";
import { setupTestServer } from "../../../shared/testUtils/setupTestServer";
import {
  handlers,
  testQueryClient,
  renderWithProviders,
} from "../../../shared/testUtils/handlers";
import { Field } from "../models/Field.model";

import { APP_ROUTES } from "../../../core/routes";
import { SetupServer } from "msw/node";

import { spies } from "../../../shared/testUtils/spies";
import { fields } from "./data";

describe("Tests of the Field List component.", () => {
  const server: SetupServer = setupTestServer(
    ...handlers(APP_ROUTES.FIELDS.LIST, spies, fields)
  );
  beforeEach(() => {
    testQueryClient.clear();
    spies.resetAll();
  });
  it("testing fields elements", async () => {
    renderWithProviders(<FieldList />);
    const rows: HTMLElement[] = await screen.findAllByRole("row");
    // three elements rows, the title and the add row
    expect(rows).toHaveLength(5);
  });

  it("Click on the second row doesn't allow to multiple inputs.", async () => {
    renderWithProviders(<FieldList />);
    const rows: HTMLElement[] = await screen.findAllByRole("row");
    const firstRow: HTMLElement = rows[1];
    const secondRow: HTMLElement = rows[2];
    fireEvent.click(firstRow);
    fireEvent.click(secondRow);
    const textBox: HTMLElement[] = await screen.findAllByRole("textbox");
    expect(textBox).toHaveLength(1);
    expect(textBox[0]).toHaveValue("field1");
  });

  it("Click on inputs cancel returns to text field.", async () => {
    renderWithProviders(<FieldList />);
    const rows: HTMLElement[] = await screen.findAllByRole("row");
    const firstRow: HTMLElement = rows[1];
    fireEvent.click(firstRow);
    const cancelButton: HTMLElement = screen.getByRole("button", {
      name: "Cancel",
    });
    fireEvent.click(cancelButton);
    const textBox: HTMLElement[] = screen.queryAllByRole("textbox");
    expect(textBox).toHaveLength(0);
  });

  it("Click on the add sign open a new input.", async () => {
    renderWithProviders(<FieldList />);
    const addButton: HTMLElement = await screen.findByRole("button", {
      name: "add",
    });
    fireEvent.click(addButton);
    const textBox: HTMLElement[] = await screen.findAllByRole("textbox");
    expect(textBox).toHaveLength(1);
    expect(textBox[0]).toHaveValue("");
  });

  it("Click on the save button will send post request.", async () => {
    renderWithProviders(<FieldList />);
    const addButton: HTMLElement = await screen.findByRole("button", {
      name: "add",
    });
    fireEvent.click(addButton);
    const saveButton: HTMLElement = screen.getByRole("button", {
      name: "Save",
    });
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(spies.post).toBeCalledTimes(1);
    });
  });

  it("Click on the delete button will send delete request.", async () => {
    renderWithProviders(<FieldList />);
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
