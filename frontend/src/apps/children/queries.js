import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";

import { Request } from "/app/src/core";


export const ChildQuery = () => {
    const queryClient = useQueryClient();
    const request = Request("/children/")

    const useList = () => {
          return useQuery({
            queryKey: ["children"],
            queryFn: request.list
          });
    };

    const useCreate = async () => {
        return useMutation({mutationFn: request.post, mutationKey: ["children"], onSuccess:async () => {
            await queryClient.cancelQueries({queryKey: ["children"]});
            queryClient.invalidateQueries({ queryKey: ["children"] });
        }})
    }


    const useRead = (childId) => {
      return useQuery({
        queryKey: ["children", childId],
        queryFn: () => request.get(childId),
        enabled: !!childId,
      });
    }


    const useUpdate = (childId) => {
        return useMutation({mutationFn: request.patch, mutationKey: ["children", childId], onSuccess: async () => {
            await queryClient.cancelQueries({queryKey: ["children", childId]});
            await queryClient.cancelQueries({queryKey: ["children"]});
            queryClient.invalidateQueries({ queryKey: ["children"] });
            queryClient.setQueryData(["children", childId]);
        }});
    }


    const useDelete = () => {}

    return {
        useList,
        useCreate,
        useRead,
        useUpdate,
        useDelete
    }
}