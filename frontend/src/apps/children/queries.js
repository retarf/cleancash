import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";

import { Request } from "/app/src/core";


export const ChildrenQuery = () => {
    const useRead = () => {
          return useQuery({
            queryKey: ["children"],
            queryFn: async () => {
              const { data } = await Request("get", "/children/");
              return data;
            },
          });
    };
    return {
        useRead,
    }

}


export const ChildQuery = (childId) => {
    const queryClient = useQueryClient();

    const getChildById = async (id) => {
        const { data } = await Request("get", `/children/${id}/`);
        return data;
    }

    const useRead = (childId) => {
      // THAT IS EVEN CREEPIER ;)
      return useQuery({
        queryKey: ["children", childId],
        queryFn: () => getChildById(childId),
        enabled: !!childId,
      });
    }

    const patch = async (child) => {
        console.log(child);
        return await Request("patch", `/children/${child.id}/`, child);
    }

    const useUpdate = (childId) => {
        return useMutation({mutationFn: patch, mutationKey: ["children", childId], onSuccess: async () => {
            await queryClient.cancelQueries({queryKey: ["children", childId]});
            await queryClient.cancelQueries({queryKey: ["children"]});
            queryClient.invalidateQueries({ queryKey: ["children"] });
            queryClient.setQueryData(["children", childId]);
        }});
    }

    const useCreate = () => {}

    const useDelete = () => {}

    return {
        useCreate,
        useRead,
        useUpdate,
        useDelete
    }
}