import React, { ReactElement } from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomTableHead } from "../components";
import { render, RenderOptions } from "@testing-library/react";
import Table from "@mui/material/Table";

describe("Tests of The CustomTableHead component", () => {
  it("Test of rendering blank columns.", async () => {
    let columns = ["", "", ""];
    render(
      <Table size="small">
        <CustomTableHead columns={columns} />
      </Table>
    );
    const columnHeaders: HTMLElement[] = await screen.findAllByRole(
      "columnheader"
    );
    expect(columnHeaders).toHaveLength(3);
  });
});
