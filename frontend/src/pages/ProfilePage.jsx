import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { useSelector } from "react-redux";
import czechu from "../components/czechu.jpg";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Container className="d-flex justify-content-center p-3">
      <Col xs={0} md={6}>
        <Image className="img-fluid img-thumbnail " src={czechu} />
        <table className="table table-dark table-striped table table-hover mt-2">
          <h6 className="">Name: {user && user.name}</h6>
          <h6>Email: {user.email}</h6>
        </table>
      </Col>
    </Container>
  );
}

export default ProfilePage;
