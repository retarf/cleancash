import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Request } from "/app/src/core";

const Query = (url) => {
  const queryClient = useQueryClient();
  const request = Request(`/${url}/`);

  const useList = () => {
    return useQuery({
      queryKey: [url],
      queryFn: request.list,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: request.post,
      mutationKey: [url],
      onSuccess: async () => {
        await queryClient.cancelQueries({ queryKey: [url] });
        queryClient.invalidateQueries({ queryKey: [url] });
      },
    });
  };

  const useRead = (id) => {
    return useQuery({
      queryKey: [url, id],
      queryFn: () => request.get(id),
      enabled: !!id,
    });
  };

  const useUpdate = (id) => {
    return useMutation({
      mutationFn: request.patch,
      mutationKey: [url, id],
      onSuccess: async () => {
        await queryClient.cancelQueries({ queryKey: [url, id] });
        await queryClient.cancelQueries({ queryKey: [url] });
        queryClient.invalidateQueries({ queryKey: [url] });
        queryClient.setQueryData([url, id]);
      },
    });
  };

  const useDelete = (id) => {
    return useMutation({
      mutationFn: () => request.del(id),
      mutationKey: [url, id, "del"],
      onSuccess: async () => {
        await queryClient.cancelQueries({ queryKey: [url, id] });
        await queryClient.cancelQueries({ queryKey: [url] });
        queryClient.invalidateQueries({ queryKey: [url] });
        // TODO: usprawnić rerenderowanie listy (optimistic update)
      },
    });
  };

  return {
    useList,
    useCreate,
    useRead,
    useUpdate,
    useDelete,
  };
};

export default Query;
