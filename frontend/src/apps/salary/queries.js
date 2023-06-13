import { useQuery, useQueries, useMutation } from "@tanstack/react-query";

import { Query } from "/app/src/core";

export const SalaryQuery = () => Query("salary");
