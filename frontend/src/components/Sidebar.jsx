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
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "../components/Spinner";

import { IoBarbellSharp } from "react-icons/io5";

function Sidebar({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex vh-100 ">
      <section className=" my-sidebar d-flex px-3 py-3 bg-light">
        {user ? (
          <div className="d-flex flex-column gap-4">
            <ListGroup>
              <ListGroup.Item>
                <Link
                  to="/"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark   "
                >
                  <AiOutlineHome /> Home
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to="/workouts"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark "
                >
                  <IoBarbellSharp /> Workouts
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to="/"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark "
                  onClick={onLogout}
                >
                  <AiOutlineLogout /> Logout
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            <ListGroup>
              <ListGroup.Item>
                <Link
                  to="/login"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark "
                >
                  <AiOutlineLogin /> Login
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  to="/register"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark "
                >
                  <AiOutlineUserAdd /> Register
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        )}
      </section>
      {children}
    </div>
  );
}

export default Sidebar;
