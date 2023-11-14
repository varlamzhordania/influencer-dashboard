import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

const CheckIsLogin = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && router.pathname === "/signin") {
      router.push("/");
    }
    if (user && router.pathname === "/signup") {
      router.push("/");
    }
  }, [router, user]);

  return <>{!user ? children : null}</>;
};

export default CheckIsLogin;
