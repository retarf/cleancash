import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {ReactElement} from "react";
import {render, RenderOptions} from "@testing-library/react";
import {rest} from "msw";

export const testQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

export const renderWithProviders = (ui: ReactElement, options?: RenderOptions) => {
    const providers = ({children}: {children: ReactElement}) => {
        return <QueryClientProvider client={testQueryClient}>
            {children}
        </QueryClientProvider>
    }

    return render(
        ui, {wrapper: providers, ...options}
    )
}

export const testHandler = (path: string) => {
    return rest.get(path, (req, res, ctx) => {
        return res(ctx.status(200));
    })
}
