import { SetupServer, setupServer } from "msw/node";
import { rest } from "msw";

type HandlerParams = Parameters<typeof setupServer>;
export const setupTestServer = (...handlers: HandlerParams): SetupServer => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
};
