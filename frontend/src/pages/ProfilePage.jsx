import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import image from "../components/image.jpg";
import Form from "react-bootstrap/Form";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.workouts);

  const [gym, setGym] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    const savedGym = localStorage.getItem("gym");
    if (savedGym) {
      setGym(savedGym);
    }

    const savedGender = localStorage.getItem("gender");
    if (savedGender) {
      setGender(savedGender);
    }

    const savedDateOfBirth = localStorage.getItem("dateOfBirth");
    if (savedDateOfBirth) {
      setDateOfBirth(savedDateOfBirth);
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex vh-100">
      <section className="bg-secondary w-100 d-flex">
        <MDBContainer className="py-5 w-100 d-flex flex-column">
          <div className="d-flex w-100">
            <MDBRow className="w-100">
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem>
                    <Link to="/">Home</Link>
                  </MDBBreadcrumbItem>
                  <MDBBreadcrumbItem>
                    <Link to="/profile">User</Link>
                  </MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>
          </div>

          <div className="d-flex flex-row">
            <MDBRow className="w-100">
              <MDBCol lg="4">
                <MDBCard
                  className="h-100"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                  }}
                ></MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4 h-80">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user && user.name}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Gym</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          <Form.Control
                            type="text"
                            name="text"
                            id="text"
                            placeholder="Please add your gym"
                            value={gym}
                            onChange={(e) => {
                              setGym(e.target.value);
                              localStorage.setItem("gym", e.target.value);
                            }}
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Gender</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          <Form.Select
                            aria-label="Default select example"
                            value={gender}
                            onChange={(e) => {
                              setGender(e.target.value);
                              localStorage.setItem("gender", e.target.value);
                            }}
                          >
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                          </Form.Select>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Date of birth</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          <Form.Control
                            type="date"
                            name="date"
                            id="text"
                            placeholder="Please add a date"
                            value={dateOfBirth}
                            onChange={(e) => {
                              setDateOfBirth(e.target.value);
                              localStorage.setItem(
                                "dateOfBirth",
                                e.target.value
                              );
                            }}
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBContainer>
      </section>
    </div>
  );
}
export default ProfilePage;
