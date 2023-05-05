import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

export const PrivateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/contacts");
      } else {
        navigate("/login");
      }
    });

    return unsubscribe;
  }, [navigate]);

  return <Outlet />;
};
