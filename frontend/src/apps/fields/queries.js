import { useQuery, useQueries, useMutation } from "@tanstack/react-query";

import { Request } from "/app/src/core";

export const useFields = () => {
  // THAT IS VERY CREEPY NAME ;)
  return useQuery({
    queryKey: ["fields"],
    queryFn: async () => {
      const { data } = await Request("get", "/fields/");
      return data;
    },
  });
};
