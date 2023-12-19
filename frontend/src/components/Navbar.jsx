import React from "react";
import { useSelector } from "react-redux";
import image from "./image.jpg";
import BSNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <BSNavbar className="bg-body-tertiary px-3">
        <BSNavbar.Brand className="d-flex justify-content-center">
          <Link to="/">
            <img src="logo.svg" width="100" height="50" alt="logo" />
          </Link>
        </BSNavbar.Brand>

        <BSNavbar.Collapse className="justify-content-end"></BSNavbar.Collapse>
      </BSNavbar>
    );
  }

  return (
    <BSNavbar className="bg-body-tertiary px-3">
      <BSNavbar.Brand className="">
        <Link to="/">
          <img src="logo.svg" width="100" height="50" alt="logo" />
        </Link>
      </BSNavbar.Brand>
      <BSNavbar.Collapse className="justify-content-end">
        <BSNavbar.Text>
          <img
            src={image}
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
