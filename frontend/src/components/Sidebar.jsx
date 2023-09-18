import React from "react";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineHome,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import { IoBarbellSharp } from "react-icons/io5";
import { GiStrong } from "react-icons/gi";

function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <div className="bg-light border-right my-sidebar">
      <div className="sidebar-logo">
        {" "}
        <GiStrong />
        Workout App
      </div>
      <div className="sidebar-heading">
        <h6></h6>
      </div>
      <ul className="list-group">
        {user ? (
          <>
            <li className="list-group-item">
              <Link to="/">
                <AiOutlineHome /> Home
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/workouts">
                <IoBarbellSharp /> Workouts
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="logout" onClick={onLogout} to="/">
                <AiOutlineLogout /> Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="list-group-item login">
              <Link to="/login">
                <AiOutlineLogin /> Login
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/register">
                <AiOutlineUserAdd /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
