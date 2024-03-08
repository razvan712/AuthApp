/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  ErrorMsg,
  Button,
} from "./CreateUserFormStyles";
import Dialog from "../Dialog/Dialog";
import { useState } from "react";

const CreateUserForm = ({ onSubmit, errorMessages }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const handleFormSubmit = () => {
    Askconfirmation();
  };

  const Askconfirmation = () => {
    setIsModelOpen(true);
  };

  const onSubmitHandler = () => {
    onSubmit(getValues(), reset, setIsModelOpen);
  };

  return (
    <>
      {errorMessages.length > 0 &&
        errorMessages.map((error, index) => (
          <ErrorMsg key={index}>
            {error.field} {error.message}
          </ErrorMsg>
        ))}
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormGroup>
          <Label>Name:</Label>
          <Input {...register("name", { required: true })} autoComplete="off" />
          {errors.name && <ErrorMsg>This field is required</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
            autoComplete="off"
          />
          {errors.email && (
            <ErrorMsg>
              This field is required and must be a valid email
            </ErrorMsg>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Gender:</Label>
          <Select {...register("gender", { required: true })}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          {errors.gender && <ErrorMsg>This field is required</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Status:</Label>
          <Select {...register("status", { required: true })}>
            <option value="">Select...</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
          {errors.status && <ErrorMsg>This field is required</ErrorMsg>}
        </FormGroup>
        <Button type="submit">Create User</Button>
      </Form>
      <Dialog
        onClose={() => setIsModelOpen(false)}
        btnText={"Save User"}
        buttonAction={onSubmitHandler}
        text={"Are you sure you want to create user?"}
        isOpen={isModelOpen}
      />
    </>
  );
};

export default CreateUserForm;
