import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FieldList } from "./components";
import { FieldsQuery } from "./queries";

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
jest.mock("./queries", () => {error: "test"});

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 1)
  }
})

const server = setupServer(
  rest.get("/fields", (req, res, ctx) => {
    return res(ctx.json([{ name: "floor" }, { name: "chair" }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("testing fields elements", async () => {
  //render(<FieldList url="/fields" />);
  //render(<FieldList />);
  render(FieldList());
  server.use(
    rest.get("/fields", (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );
});
