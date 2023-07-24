import {SetupServer, setupServer} from "msw/node";
import {rest} from "msw";

// const server = setupServer(
//     rest.get("/fields", (req, res, ctx) => {
//         return res(ctx.json([{ name: "floor" }, { name: "chair" }]));
//     })
// );
//
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

type HandlerParams = Parameters<typeof setupServer>
export const setupTestServer = (...handlers: HandlerParams): SetupServer => {
    const server = setupServer(...handlers);
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    return server;
}
