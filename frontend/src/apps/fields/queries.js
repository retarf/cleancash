import { useQuery, useQueries, useMutation } from "@tanstack/react-query";

import { Request } from "/app/src/core";
import { Query } from "/app/src/core";

export const FieldsQuery = () => Query("fields");
