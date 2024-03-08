import styled from "styled-components";

export const StyledDialog = styled.dialog`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  z-index: 1000;
  bottom: 0%;
`;

export const OpenDialogButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
`;

export const ModelText = styled.h4`
  color: black;
`;
export const ErrorText = styled.h6`
  color: red;
`;
