import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {FieldList} from './components'
import {FieldsQuery} from "./queries";

jest.mock('FieldsQuery');


const server = setupServer(
    rest.get('/fields', (req, res, ctx) => {
        return res(ctx.json([
            {name: 'floor'},
            {name: 'chair'},
        ]))
    }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('testing fields elements', async () => {
    render(<FieldList url="/fields" />);
    server.use(
        rest.get(
            '/fields', (req, res, ctx) => {
                return res(ctx.status(200))
            }
        )
    )
})


