/* eslint-disable no-unused-vars */

import { useAuth } from "../../context/context";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";
import UsersTable from "../../components/UsersTable/UsersTable";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { createUser } from "../../api/user";

const CreateUsers = () => {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const [errorMessages, setErrorMessages] = useState([]);

  const { mutate } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      console.error("Error creating user:", error.response.data);

      if (Array.isArray(error.response?.data)) {
        setErrorMessages(error.response.data);
      } else {
        setErrorMessages(["Failed to create user."]);
      }
    },
  });

  const onSubmit = (data, reset, setIsModelOpen) => {
    setErrorMessages([]);

    mutate(data, {
      onSuccess: () => {
        reset();
        setIsModelOpen(false);
      },
      onError: () => {
        setIsModelOpen(false);
      },
    });
  };

  return (
    <div>
      <CreateUserForm errorMessages={errorMessages} onSubmit={onSubmit} />
      <UsersTable token={token} />
    </div>
  );
};

export default CreateUsers;
