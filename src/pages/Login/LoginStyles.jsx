import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f7;
  flex-direction: column;
`;

export const InstructionText = styled.p`
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin-top: 1rem;
  max-width: 400px;
  font-weight: 700;
`;

export const Form = styled.form`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  align-items: center;
  height: 200px;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 90%;
`;

export const Button = styled.button`
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 200px;
  margin-top: auto;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMsg = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
`;
