// import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import axiosInstance from "../../shared/utils/axios";
import { useSelector } from "react-redux";
// import { clearTokens, getTokens } from "../../shared/utils/token";
// import useIsMountedRef from "../hook/useIsMountedRef";
// import { initialise } from "../data/authSlice";
import { RootState } from "@src/modules/shared/store";
import LazyLoad from "@src/modules/shared/components/LazyLoad/LazyLoad";

interface AuthProviderProps {
  children: React.ReactNode;
}

// interface JwtPayload {
//   exp: number;
// }

const AuthProvider = ({ children }: AuthProviderProps) => {
  // const isMounted = useIsMountedRef();

  const auth = useSelector((state: RootState) => state.auth);
  const isInitialised = auth?.isInitialised ?? false; // Provide a default value
  // const dispatch = useDispatch();

  // const isValidToken = (token: string) => {
  //   const decoded: JwtPayload = jwtDecode(token);
  //   const currentTime = Date.now() / 1000;
  //   return decoded.exp > currentTime;
  // };

  // useEffect(() => {
  //   if (!isMounted.current) {
  //     return;
  //   }

  //   async function fetchUser() {
  //     const { refresh_token } = getTokens();
  //     if (refresh_token && isValidToken(refresh_token)) {
  //       const response = await axiosInstance.get("/api/auth/me");
  //       const user = response.data.payload;
  //       dispatch(initialise({ isAuthenticated: true, user }));
  //     } else {
  //       // to be changed to false
  //       dispatch(initialise({ isAuthenticated: true, user: null }));
  //       clearTokens();
  //     }
  //   }

  //   fetchUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!isInitialised) {
    return <LazyLoad />;
  }

  return <>{children}</>;
};

export default AuthProvider;
