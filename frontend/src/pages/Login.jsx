import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

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
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/workouts");
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
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>
              <p className="label-txt">ENTER YOUR EMAIL</p>
              <input
                type="email"
                className="input"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
              <div className="line-box">
                <div className="line"></div>
              </div>
            </label>
            <label>
              <p className="label-txt">ENTER YOUR PASSWORD</p>
              <input
                type="password"
                className="input"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <div className="line-box">
                <div className="line"></div>
              </div>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default Login;
