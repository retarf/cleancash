import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ResponseComposition, rest } from "msw";
import { baseURL } from "../../core/api/client";
import { spiesObject } from "./spies";

export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
) => {
  const providers = ({ children }: { children: ReactElement }) => {
    return (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: providers, ...options });
};

export const handlers = (
  path: string,
  spies: spiesObject,
  json: Array<object>
) => {
  const url = `${baseURL}${path}`;
  return [
    rest.get(url, (req, res, ctx) => {
      spies.get();
      return res(ctx.json(json));
    }),
    rest.get(`${url}/:id/`, (req, res, ctx) => {
      spies.retrieve();
      return res(ctx.json(json[0]));
    }),
    rest.patch(`${url}/:id`, (req, res, ctx) => {
      spies.patch();
      return res(ctx.json(json));
    }),
    rest.delete(`${url}/:id`, (req, res, ctx) => {
      spies.delete();
      return res(ctx.status(204));
    }),
    rest.post(url, (req, res, ctx) => {
      spies.post();
      return res(ctx.status(201));
    }),
  ];
};
