import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Form, Button } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
      console.log(userData);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        className="d-flex flex-column d-flex align-items-center pt-4 "
      >
        <h1 className="register mt-3 mb-3 w-50 text-center">
          Create your account
        </h1>
        <Form.Group className="mb-3 w-25" controlId="nameInput">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="emailInput">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="passwordInput">
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-25" controlId="repeatPasswordInput">
          <Form.Control
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={password2}
            onChange={onChange}
          />
        </Form.Group>

        <Button className="mb-3 w-25" variant="dark" type="submit">
          Submit
        </Button>
      </Form>
      <>
        <Footer />
      </>
    </>
  );
}

export default Register;
