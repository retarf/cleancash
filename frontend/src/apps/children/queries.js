import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";

import { Request } from "/app/src/core";


export const useChildren = () => {

      // THAT IS VERY CREEPY NAME ;)
      return useQuery({
        queryKey: ["children"],
        queryFn: async () => {
          const { data } = await Request("get", "/children/");
          return data;
        },
      });
    };

const getChildById = async (id) => {
    const { data } = await Request("get", `/children/${id}/`);
    return data;
}

export const useChild = (childId) => {
  // THAT IS EVEN CREEPIER ;)
  return useQuery({
    queryKey: ["children", childId],
    queryFn: () => getChildById(childId),
    enabled: !!childId,
  });
}

const saveChild = async (child) => {
    return await Request("patch", `/children/${child.id}/`, child);
}

export const useSaveChild = (childId) => {
    return useMutation({mutationFn: saveChild, mutationKey: ["children", childId]});
}