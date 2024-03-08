import styled from "styled-components";
import { Link } from "react-router-dom";

export const DashboardContainer = styled.div`
  padding: 1rem;
  background-color: #f4f4f4;
`;

export const NavBar = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem 0;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
`;

export const NavTitle = styled.div`
  color: white;
  text-decoration: none;
  margin: auto 1rem;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
`;

export const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  justify-self: flex-end;
  cursor: pointer;
  margin: 0 1rem;
  font-weight: 600;
  &:hover {
    background-color: #d32f2f;
  }
`;
