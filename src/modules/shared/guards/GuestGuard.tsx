import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { PATH } from "@src/modules/chat/routes/paths";

interface MainLayoutProps {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: MainLayoutProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to={PATH.CHAT} /> : children;
};

export default GuestGuard;
