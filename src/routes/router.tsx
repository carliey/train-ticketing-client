import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { login, selectCurrentUser } from "../screens/auth/authSlice";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/Signup";
import Booking from "../screens/booking/Booking";
import Payment from "../screens/booking/Payment";
import Dashboard from "../screens/dashboard/Dashboard";
import History from "../screens/history/History";
import Profile from "../screens/profile/Profile";
import TicketDetails from "../screens/history/TicketDetails";

type Props = {};

type ProtectedRouteType = {
  user: any;
  children?: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteType) => {
  //wrapper component for protected routes
  const isAuth = !!user;
  console.log(isAuth);

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
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      <Route
        element={
          <ProtectedRoute user={user}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="history" element={<History />} />
        <Route path="ticket" element={<TicketDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
