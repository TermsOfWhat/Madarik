import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { PATH } from "@src/modules/dashboard/routes/paths";

interface MainLayoutProps {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to={PATH.DASHBOARD} /> : children;
};

export default GuestGuard;
