import { useNavigate } from "react-router-dom";
import CreateUsers from "../CreateUser/CreateUsers";
import { useAuth } from "../../context/context";
import {
  DashboardContainer,
  NavBar,
  NavTitle,
  LogoutButton,
} from "./DashboardStyles";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DashboardContainer>
      <NavBar>
        <NavTitle>Dashboard</NavTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavBar>
      <CreateUsers />
    </DashboardContainer>
  );
};

export default Dashboard;
