import {
    useQuery,
    useQueryClient,
    QueryClient,
} from '@tanstack/react-query'

import { Request } from '/app/src/core'

export const useChildrenListQuery = () => useQuery(
    ["children"], () => Request("get", "/children/").then(response => { return response.data}),
);