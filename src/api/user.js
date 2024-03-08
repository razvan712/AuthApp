import { useMemo } from "react";
import { useQuery } from "react-query";
import { axiosInstance } from "../utils/axios";

const fetcher = async (url) => {
  const res = await axiosInstance.get(url);
  return res.data;
};

export const createUser = async (data) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export function useGetUsers() {
  const URL = `/users`;

  const { data, isLoading, isFetching, error, refetch, isError } = useQuery(
    "users",
    () => fetcher(URL),
    {
      refetchOnMount: false,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      isError: isError,
      usersValidating: isFetching,
      usersEmpty: !isLoading && !data?.length,
      usersRefetch: refetch,
    }),
    [data, error, isLoading, isFetching, refetch, isError]
  );

  return memoizedValue;
}

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userDetails) => {
  const response = await axiosInstance.put(`/users/${userId}`, userDetails);

  return response.data;
};
