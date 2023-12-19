import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Form, Button } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Form
        onSubmit={onSubmit}
        className="d-flex flex-column d-flex align-items-center  "
      >
        <h1 className="login mt-3 mb-3 w-50 text-center pt-4">
          Login and start your workout
        </h1>

        <Form.Group className="mb-3 w-25">
          <Form.Control
            type="email"
            className="input"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-25">
          <Form.Control
            type="password"
            className="input"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
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

export default Login;
