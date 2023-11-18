import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BSNavbar from "react-bootstrap/Navbar";
import czechu from "./czechu.jpg";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <BSNavbar className="bg-body-tertiary px-3">
        <BSNavbar.Brand>
          <Link to="/"> Workout App</Link>
        </BSNavbar.Brand>
        {/* <BSNavbar.Toggle /> */}
        <BSNavbar.Collapse className="justify-content-end"></BSNavbar.Collapse>
      </BSNavbar>
    );
  }

  return (
    <BSNavbar className="bg-body-tertiary px-3">
      <BSNavbar.Brand>
        <Link to="/"> Workout App</Link>
      </BSNavbar.Brand>
      {/* <BSNavbar.Toggle /> */}
      <BSNavbar.Collapse className="justify-content-end">
        <BSNavbar.Text>
          <img
            src={czechu}
            alt=""
            width="35"
            height="35"
            className="rounded-circle me-2"
          />
          Signed in as: <Link to="/profile"> {user && user.name} </Link>
        </BSNavbar.Text>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
}

export default Navbar;
