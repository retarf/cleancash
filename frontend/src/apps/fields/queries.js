import { useQuery, useQueries, useMutation } from "@tanstack/react-query";

import { Request } from "/app/src/core";

export const useFields = () => {
  const request = Request("/fields/");
  return useQuery({
    queryKey: ["fields"],
    queryFn: request.list
  });
};
