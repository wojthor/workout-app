import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

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

    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <p className="label-txt">ENTER YOUR NAME</p>
        <input
          type="text"
          className="input"
          name="name"
          value={name}
          onChange={onChange}
        />
        <div className="line-box">
          <div className="line"></div>
        </div>
      </label>

      <label>
        <p className="label-txt">ENTER YOUR EMAIL</p>
        <input
          type="email"
          className="input"
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
          name="password"
          value={password}
          onChange={onChange}
        />
        <div className="line-box">
          <div className="line"></div>
        </div>
      </label>

      <label>
        <p className="label-txt">REPEAT YOUR PASSWORD</p>
        <input
          type="password"
          className="input"
          name="password2"
          value={password2}
          onChange={onChange}
        />
        <div className="line-box">
          <div className="line"></div>
        </div>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
