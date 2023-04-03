import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { login, logout, selectCurrentUser } from "../screens/auth/authSlice";

type Props = {};

type ProtectedRoute = {
  user: any;
  children?: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRoute) => {
  //wrapper component for protected routes
  const dispatch = useAppDispatch();
  const isAuth = !!user;

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const Router = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    //log the user back in with local storage data on login
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      dispatch(login(JSON.parse(credentials)));
    }
  }, []);

  useEffect(() => {
    //route the user to dashboard, if a logged in user tries to access signin page
    if (!!user && location.pathname === "/signin") {
      navigate("/");
    }
  }, [location, user]);

  return (
    <Routes>
      <Route path="signin" element={<h1>signin</h1>} />
      <Route path="signup" element={<h1>signup</h1>} />

      <Route
        //shared pages
        element={<ProtectedRoute user={user} />}
      >
        <Route path="/" element={<h1>dashboard</h1>} />
        <Route path="profile" element={<h1>profile</h1>} />
        <Route path="history" element={<h1>history</h1>} />
        <Route path="booking" element={<h1>booking</h1>} />
      </Route>

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
